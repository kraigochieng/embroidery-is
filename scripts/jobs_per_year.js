async function readJobsPerYear() {
    let response = await fetch('../db/read_jobs_per_year.php')
    let jobs_per_year = await response.json()
    return jobs_per_year
}

// Get Data
let jobs_per_year = await readJobsPerYear()

// Graph Dimensions
let width = 640
let height = 640
let padding = 80

// Calculate Mins and Max 
let min = {
    x: d3.min(jobs_per_year, d => d.year),
    y: d3.min(jobs_per_year, d => d.total_jobs)
}

let max = {
    x: d3.max(jobs_per_year, d => d.year),
    y: d3.max(jobs_per_year, d => d.total_jobs)
}

// // Format Data
// let parseTime = d3.timeParse("%Y")
// let years = []
// for(let i = 0; i < jobs_per_year.length; i++) {
//     years.push(parseTime(jobs_per_year[i].year))
// }
// // Set Domains
// let domain = {
//     x: d3.extent(years),
//     y: [min.y, max.y]
// }

// Set Domains
let domain = {
    x: [min.x, max.x],
    y: [min.y, max.y]
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
            .tickSize(0),
    y: d3.axisLeft(scale.y)
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
            .style('background-color', 'lightblue')

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
            .y(d => scale.y(d.total_jobs))

svg.append('path')
    .datum(jobs_per_year)
    .attr("d", line)
    .attr("class", "line")
    .style("fill", "none")
    .style("stroke", "green")
    .style("stroke-width", 2)

// Scatter Plot
svg.selectAll('circle')
    .data(jobs_per_year)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr("cx", d => scale.x(d.year))
    .attr("cy", d => scale.y(d.total_jobs))
    .attr("r", 7)

// Add Circle Labels 
let circle = document.querySelectorAll('.circle')
for(let i = 0; i < circle.length; i++) {
    let total_jobs = document.querySelector('#total-jobs')
    circle[i].addEventListener('mouseover', function(e) {
        total_jobs.style.top = `${e.clientY - 60}px`
        total_jobs.style.left = `${e.clientX - 30}px`
        total_jobs.style.opacity = 1
        total_jobs.innerHTML = `Year: ${jobs_per_year[i].year}<br>Jobs: ${jobs_per_year[i].total_jobs}`
    })

    circle[i].addEventListener('mouseout',function() {
        total_jobs.textContent = ""
        total_jobs.style.opacity = 0 
    })
}

// Title
svg.append('text')
    .attr('x', width/2)
    .attr('y', padding/2)
    .attr('text-anchor', 'middle')
    .attr('class', 'graph-heading')
    .text('TOTAL JOBS PER YEAR')

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
    .text('Total Jobs')

    svg.selectAll('line')
        .data(jobs_per_year)
        .enter()
        .append('line')
        .attr('x1', 10)
        .attr('y1', 20)
        .attr('x2', 10)
        .attr('y2', 500)
        .attr('stroke', 'orange')
        .attr('stroke-width', 3)
