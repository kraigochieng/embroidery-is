import { yearComponent } from "../components/yearComponent.js"
import { monthComponent } from "../components/monthComponent.js"
import { dayComponent } from "../components/dayComponent.js"

async function getInstructionsPerHour(year, month, day) {
    let body = new FormData()
    body.append('year', year)
    body.append('month', month)
    body.append('day', day)

    let settings = { method: 'POST', body: body }

    let response = await fetch('../db/read_instructions_per_hour.php', settings)
    return response.json()
}

async function getYears() {
    let response = await fetch('../db/read_years.php')
    return response.json()
}

async function getMonths(year) {
    let body = new FormData()
    body.append('year', year)

    let settings = { method: 'POST', body: body}
    let response = await fetch('../db/read_months.php', settings)
    return response.json()

}

async function getDays(year, month) {
    let body = new FormData()
    body.append('year', year)
    body.append('month', month)

    let settings = { method: 'POST', body: body}
    let response = await fetch('../db/read_days.php', settings)
    return response.json()
}

async function clearElement(selector) {
    let element = document.querySelector(selector)
    element.innerHTML = ''
}

let years = await getYears()

// Add Year Radio Elements
let year_radio_section = document.querySelector('#year-radio-section')
for(let i = 0; i < years.length; i++) {
    let year = yearComponent(years[i].year)
    year_radio_section.appendChild(year.radio)
    year_radio_section.appendChild(year.label)
}

let year_radio = document.querySelectorAll('.year-radio')
for(let i = 0; i < year_radio.length; i++) {
    year_radio[i].addEventListener('input', async() => {
        await addMonths(i)
    })
}

async function addMonths(year_index) {
    let year_radio = document.querySelectorAll('.year-radio')
    let year = year_radio[year_index].value
    let months = await getMonths(year)
    // Select Month Radio Section
    let month_radio_section = document.querySelector('#month-radio-section')
    // Clear DOM
    month_radio_section.innerHTML = ''
    // Add Month Radio 
    for(let i = 0; i < months.length; i++) {
        let month = monthComponent(months[i].month)
        month.radio.addEventListener('input', async() => {
            await addDays(year, i)
        })
        month_radio_section.appendChild(month.radio)
        month_radio_section.appendChild(month.label)
    }
}


async function addDays(year, month_index) {
    await clearElement('#day-radio-section')
    let month_radio = document.querySelectorAll('.month-radio')
    let month = month_radio[month_index].value
    let days = await getDays(year, month)

    let day_radio_section = document.querySelector('#day-radio-section')

    for(let i = 0; i < days.length; i++) {
        let day = dayComponent(days[i].day)
        day.radio.addEventListener('input', async()=> {
            await addGraph(year, month, day.radio.value)
        })
        day_radio_section.appendChild(day.radio)
        day_radio_section.appendChild(day.label)
    }
}

async function addGraph(year, month, day) {
    await clearElement('svg')
    let instructions_per_hour = await getInstructionsPerHour(year, month, day)
    console.log(instructions_per_hour)
    drawGraph(instructions_per_hour)
}

function drawGraph(dataset) {
    // Graph Dimensions
    let width = 500
    let height = 500
    let padding = 80

    // Min
    let min = {
        x: d3.min(dataset, d => d.hour),
        y: d3.min(dataset, d => d.total_quantity)
    }

    // Max
    let max = {
        x: d3.max(dataset, d => d.hour),
        y: d3.max(dataset, d => parseInt(d.total_quantity))
    }

    // Domain
    let domain = {
        x: [0, 23],
        y: [0, max.y]
    }

    // Ranges
    let range = {
        x: [padding, width - padding],
        y: [height - padding, padding]
    }

    // Scale
    let scale = {
        x: d3.scaleLinear().domain(domain.x).range(range.x),
        y: d3.scaleLinear().domain(domain.y).range(range.y)
    }

    // Axes
    let axis = {
        x: d3.axisBottom(scale.x)
            .ticks(24)
            .tickSize(5),

        y: d3.axisLeft(scale.y)
            .tickSize(5),

    }

    // Grid
    let grid = {
        x: d3.axisBottom(scale.x)
            .tickFormat("")
            .tickSize(-height + (padding * 2)),

        y: d3.axisLeft(scale.y)
            .tickFormat("")
            .tickSize(-width + (padding * 2))
    }
    // SVG
    let svg = d3.select('svg')
                .attr('width', width)
                .attr('height', height)
    
    // Grid X
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height - padding})`)
        .call(grid.x)

    // Grid Y
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(${padding},0)`)
        .call(grid.y)

    // X Axis 
    svg.append("g")
        .attr("transform", `translate(0,${height - padding})`)
        .call(axis.x)

    // Y axis
    svg.append("g")
        .attr("transform", `translate(${padding},0)`)
        .call(axis.y)

    // Line Bar
    let line = d3.line()
        .x(d => scale.x(d.hour))
        .y(d => scale.y(d.total_quantity))
        // .curve(d3.curveMonotoneX)

        svg.append('path')
        .datum(dataset)
        .attr("d", line)
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", "green")
        .style("stroke-width", 2)
    // Scatter Plot
    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr("cx", d => scale.x(d.hour))
        .attr("cy", d => scale.y(d.total_quantity))
        .attr("r", 7)

    // Add Circle Labels 
    let circle = document.querySelectorAll('.circle')
    for(let i = 0; i < circle.length; i++) {
        let total_quantity = document.querySelector('#total-quantity')
        circle[i].addEventListener('mouseover', function(e) {
            total_quantity.style.top = `${e.clientY - 60}px`
            total_quantity.style.left = `${e.clientX - 30}px`
            total_quantity.style.opacity = 1
            total_quantity.innerHTML = `Hour: ${dataset[i].hour}<br>Jobs: ${dataset[i].total_quantity}`
        })

        circle[i].addEventListener('mouseout',function() {
            total_quantity.textContent = ""
            total_quantity.style.opacity = 0 
        })
    }
    
    // Title
    svg.append('text')
        .attr('x', width/2)
        .attr('y', padding/2)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-heading')
        .text('TOTAL JOBS PER DAY')

    // X label
    svg.append('text')
        .attr('x', width/2)
        .attr('y', height - (padding/2))
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .text('Hour')

    // Y label
    svg.append('text')
        .attr('x', -height/2)
        .attr('y', (padding)/2)
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(270)`)
        .attr('class', 'graph-label')
        .text('Total Jobs')

    svg.selectAll('line')
        .data(dataset)
        .enter()
        .append('line')
        .attr('x1', 10)
        .attr('y1', 20)
        .attr('x2', 10)
        .attr('y2', 500)
        .attr('stroke', 'orange')
        .attr('stroke-width', 3)
}