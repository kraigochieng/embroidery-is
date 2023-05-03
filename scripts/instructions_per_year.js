async function getInstructionsPerYear() {
    let response = await fetch('../db/read_instructions_per_year.php')
    return response.json()
}

// Get Data
let instructions_per_year = await getInstructionsPerYear()
console.log(instructions_per_year)
// Get Total Money Made
let total_money_made = document.querySelector('#total-money-made')
let x = 0
for(let i = 0; i < instructions_per_year.length; i++) {
    x += parseInt(instructions_per_year[i].total_quantity)
}
total_money_made.textContent = (x * 100).toLocaleString('en-US')

// Graph Dimensions
let width = 560
let height = 560
let padding = 80

// Calculate Mins and Max 
let min = {
    x: d3.min(instructions_per_year, d => d.year),
    y: d3.min(instructions_per_year, d => d.total_quantity)
}

let max = {
    x: d3.max(instructions_per_year, d => d.year),
    y: d3.max(instructions_per_year, d => d.total_quantity)
}

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
            .tickFormat(d => d.toString())
            
            .tickSize(5),
    y: d3.axisLeft(scale.y)
        .ticks(5)
        .ticks(max.y/10000)
        .tickFormat(d => d/1000)
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
            .x(d => scale.x(d.year))
            .y(d => scale.y(d.total_quantity))

console.log(svg)

svg.append('path')
    .datum(instructions_per_year)
    .attr("d", line)
    .attr("class", "line")
    .style("fill", "none")
    .style("stroke", "green")
    .style("stroke-width", 2)

// Bar Graph
// let bar = svg.append('g')
//     .attr('transform', `translate(${padding}, ${padding})`)

svg.selectAll('rect')
    .data(instructions_per_year)
    .enter()
    .append('rect')
    .attr('x', d => scale.x(d.year))
    .attr('y', d => scale.y(d.total_quantity))

// Scatter Plot
svg.selectAll('circle')
    .data(instructions_per_year)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr("cx", d => scale.x(d.year))
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
        total_jobs.innerHTML = `Year: ${instructions_per_year[i].year}<br>Instructions: ${(instructions_per_year[i].total_quantity * 1).toLocaleString('en-US')}`
        total_jobs.style.backgroundColor = 'yellow'
        let money_made_per_year = document.querySelector('#money-made-per-year')
        money_made_per_year.textContent = (instructions_per_year[i].total_quantity * 100).toLocaleString('en-US')
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
    .text('TOTAL INSTRUCTIONS PER YEAR')

// X label
svg.append('text')
    .attr('x', width/2)
    .attr('y', height - (padding/2))
    .attr('text-anchor', 'middle')
    .attr('class', 'graph-label')
    .text('Year')

// Y label
svg.append('text')
    .attr('x', -height/2)
    .attr('y', (padding)/2)
    .attr('text-anchor', 'middle')
    .attr('transform', `rotate(270)`)
    .attr('class', 'graph-label')
    .text('Total Quantity (In Thousands)')

svg.selectAll('line')
    .data(instructions_per_year)
    .enter()
    .append('line')
    .attr('x1', 10)
    .attr('y1', 20)
    .attr('x2', 10)
    .attr('y2', 500)
    .attr('stroke', 'orange')
    .attr('stroke-width', 3)
