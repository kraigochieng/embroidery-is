import { yearComponent } from "../components/yearComponent.js"
import { getMonth } from "../functions/getMonth.js"
async function getInstructionsPerMonth(year) {
    let body = new FormData()
    body.append('year', year)
    
    let settings = { method: 'POST', body: body }
    let response = await fetch('../db/read_instructions_per_month.php', settings)
    return response.json()
}

async function getYears() {
    let response = await fetch('../db/read_years.php')
    return response.json()
}


let years = await getYears()

// Add Year Radio Elements
let year_radio_section = document.querySelector('#year-radio-section')
for(let i = 0; i < years.length; i++) {
    let year = yearComponent(years[i].year)
    year.radio.addEventListener('input', async()=> {
        let instructions_per_month = await getInstructionsPerMonth(years[i].year)
        console.log(instructions_per_month)
        let svg = document.querySelector('svg')
        svg.innerHTML = ''
        drawGraph(instructions_per_month)
    })
    year_radio_section.appendChild(year.radio)
    year_radio_section.appendChild(year.label)
}

// Draw First Graph
let instructions_per_month = await getInstructionsPerMonth(years[years.length - 1].year)
let year_radio = document.querySelectorAll('.year-radio')
year_radio[year_radio.length - 1].checked = true
drawGraph(instructions_per_month)

// Get Total Money Made
let total_money_made = document.querySelector('#total-money-made')
let x = 0
for(let i = 0; i < instructions_per_month.length; i++) {
    x += parseInt(instructions_per_month[i].total_quantity)
}
total_money_made.textContent = (x * 100).toLocaleString('en-US')

function drawGraph(dataset) {
    // Graph Dimensions
    let width = 600
    let height = 600
    let padding = 80

    // Calculate Mins and Max 
    let min = {
        x: d3.min(dataset, d => d.month),
        y: d3.min(dataset, d => d.total_quantity)
    }

    let max = {
        x: d3.max(dataset, d => d.month),
        y: d3.max(dataset, d => parseInt(d.total_quantity))
    }

    console.log(max.y)
    // Set Domains
    let domain = {
        x: [min.x, max.x],
        y: [0, max.y]
    }

    // Set Ranges
    let range = {
        x: [padding, width - padding],
        y: [height - padding, padding]
    }

    // Set Scales
    let scale = {
        x: d3.scaleLinear().domain(domain.x).range(range.x),
        y: d3.scaleLinear().domain(domain.y).range(range.y)
    }

    // Set Axes
    let axis = {
        x: d3.axisBottom(scale.x)
                .ticks(12)
                .tickFormat(d => getMonth(d))
                .tickSize(5),
        y: d3.axisLeft(scale.y)
            .tickSize(5)
            .tickFormat(d => d)
    }

    // For Gridlines
    let grid = {
        x: d3.axisBottom(scale.x)
                .tickFormat("")
                .tickSize(-height + (padding * 2)),
        y: d3.axisLeft(scale.y)
                .tickFormat("")
                .tickSize(-width  + (padding * 2))
    }

    // SVG
    let svg = d3.select('svg')
                .attr('width', width)
                .attr('height', height)

    // GridLines - set them before axes
    svg.append("g")
    .attr('class', 'grid')
    .attr("transform", `translate(0,${height - padding})`)
    .call(grid.x)

    svg.append("g")
    .attr('class', 'grid')
    .attr("transform", `translate(${padding},0)`)
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
                .x(d => scale.x(d.month))
                .y(d => scale.y(d.total_quantity))

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
        .attr("cx", d => scale.x(d.month))
        .attr("cy", d => scale.y(d.total_quantity))
        .attr("r", 7)

    // Add Circle Labels 
    let circle = document.querySelectorAll('.circle')
    for(let i = 0; i < circle.length; i++) {
        let total_jobs = document.querySelector('#total-quantity')
        circle[i].addEventListener('mouseover', function(e) {
            total_jobs.style.top = `${e.clientY - 60}px`
            total_jobs.style.left = `${e.clientX - 30}px`
            total_jobs.style.opacity = 1
            total_jobs.innerHTML = `Year: ${dataset[i].month}<br>Instructions: ${(dataset[i].total_quantity * 1).toLocaleString('en-US')}`
            total_jobs.style.backgroundColor = 'yellow'
            let money_made_per_year = document.querySelector('#money-made-per-year')
            money_made_per_year.textContent = (dataset[i].total_quantity * 100).toLocaleString('en-US')
            let money_made_per_year_header = document.querySelector('#money-made-per-year-header')
            money_made_per_year_header.textContent = 'Money Made'
        })

        circle[i].addEventListener('mouseout',function() {
            total_jobs.textContent = ""
            total_jobs.style.opacity = 0
            let money_made_per_year = document.querySelector('#money-made-per-year')
            money_made_per_year.textContent = ''
            let money_made_per_year_header = document.querySelector('#money-made-per-year-header')
            money_made_per_year_header.textContent = ''
            
        })
    }

    // Title
    svg.append('text')
        .attr('x', width/2)
        .attr('y', padding/2)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-heading')
        .text('TOTAL INSTRUCTIONS PER MONTH')

    // X label
    svg.append('text')
        .attr('x', width/2)
        .attr('y', height - (padding/2))
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .text('Month')

    // Y label
    svg.append('text')
        .attr('x', -height/2)
        .attr('y', (padding)/2)
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(270)`)
        .attr('class', 'graph-label')
        .text('Total Quantity (In Thousands)')

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

