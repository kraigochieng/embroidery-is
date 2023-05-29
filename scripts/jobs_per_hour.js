import { numberWithCommas } from "../functions/numbersWithCommas.js"

async function getJobsPerHour(year, month, day) {
    let body = new FormData()
    body.append('year', year)
    body.append('month', month)
    body.append('day', day)

    let settings = { method: 'POST', body: body }

    let response = await fetch('../db/read_jobs_per_hour.php', settings)
    return response.json()
}

export async function jobsPerHour(year, month, day) {
    let jobs_per_hour = await getJobsPerHour(year, month, day)
    
    let svg = d3.select('svg')
    let margin = 150
    let width = svg.attr('width') - margin
    let height = svg.attr('height') - margin

    let max = {
        x: d3.max(jobs_per_hour, d => d.hour),
        y: d3.max(jobs_per_hour, d => parseInt(d.jobs))
    }

    let domain = {
        x: jobs_per_hour.map(d => d.hour),
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
        .tickValues(
            scale.y.ticks()
                    .filter(tick => Number.isInteger(tick))
            )
        // .tickFormat(d3.format('d'))
        .tickFormat(d => numberWithCommas(d))
    }

    let g = svg.append('g')
                .attr('transform', `translate(${margin/2}, ${margin/2})`)

    // X axis
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(axis.x)

    // X label
    svg.append('text')
        .attr('x', svg.attr('width')/2)
        .attr('y', svg.attr('height') - 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .text('Time')

    // Y axis 
    g.append('g')
        .call(axis.y)
        .append("text")

    // Y label
    svg.append('text')
        .attr('x', -svg.attr('height')/2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(270)`)
        .attr('class', 'graph-label')
        .text('Total Jobs')

    g.selectAll('.bar')
        .data(jobs_per_hour)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scale.x(d.hour))
        .attr('y', d => scale.y(d.jobs))
        .attr('width', scale.x.bandwidth())
        .attr('height', d => height - scale.y(d.jobs))
        .append("title")
        .attr('class', 'tooltip')
        .text(d => `Total Customers: ${numberWithCommas(d.jobs)}`)
}