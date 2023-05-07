async function readJobsPerYear() {
    let response = await fetch('../db/read_jobs_per_year.php')
    let jobs_per_year = await response.json()
    return jobs_per_year
}

// Get Data
let jobs_per_year = await readJobsPerYear()

let svg = d3.select('svg')
let margin = 80
let width = svg.attr('width') - margin
let height = svg.attr('height') - margin

let min = {
    x: d3.min(jobs_per_year, d => d.year),
    y: d3.min(jobs_per_year, d => d.total_jobs)
}

let max = {
    x: d3.max(jobs_per_year, d => d.year),
    y: d3.max(jobs_per_year, d => d.total_jobs)
}

let domain = {
    x: jobs_per_year.map(d => d.year),
    y: [0, max.y]
}

let range = {
    x: [0, width],
    y: [height, 0]
}

let scale = {
    x: d3.scaleBand().domain(domain.x).range(range.x).padding(0.25),
    y: d3.scaleLinear().domain(domain.y).range(range.y)
}

let axis = {
    x: d3.axisBottom(scale.x),
    y: d3.axisLeft(scale.y)
}

let g = svg.append('g')
            .attr('transform', `translate(${margin/2}, ${margin/2})`)

// X axis
g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(axis.x)

// Y axis 
g.append('g')
    .call(axis.y)
    .append('text')
    .attr('y', 6)
    .attr('dy', '0.7em')
    .attr('text-anchor', 'end')
    .text('value')