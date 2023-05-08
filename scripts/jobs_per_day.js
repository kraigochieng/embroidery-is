import { getMonth } from "../functions/getMonth.js"
import { yearComponent } from "../components/yearComponent.js"
import { monthComponent } from "../components/monthComponent.js"

async function getJobsPerDay(year, month) {
    let body = new FormData()
    body.append('year', year)
    body.append('month', month)
    let settings = { method: 'POST', body: body }

    let response = await fetch('../db/read_jobs_per_day.php',  settings)
    let data = response.json()
    return data
}

async function getYears() {
    let response = await fetch('../db/read_years.php')
    let data = response.json()
    return data
}

async function getMonths(year) {
    let body = new FormData()
    body.append('year', year)

    let settings = { method: 'POST', body: body}
    let response = await fetch('../db/read_months.php', settings)
    let data = response.json()
    return data
}

export async function jobsPerDay(year, month) {
    let jobs_per_day = await getJobsPerDay(year, month)

    let svg = d3.select('svg')
    let margin = 150
    let width = svg.attr('width') - margin
    let height = svg.attr('height') - margin

    let max = {
        x: d3.max(jobs_per_day, d => d.day),
        y: d3.max(jobs_per_day, d => d.jobs)
    }

    let domain = {
        x: jobs_per_day.map(d => d.day),
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

    // X label
    svg.append('text')
        .attr('x', svg.attr('width')/2)
        .attr('y', svg.attr('height') - 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .text('Day')

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
        .data(jobs_per_day)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scale.x(d.day))
        .attr('y', d => scale.y(d.jobs))
        .attr('width', scale.x.bandwidth())
        .attr('height', d => height - scale.y(d.jobs))
        .append("title")
        .attr('class', 'tooltip')
        .text(d => d.jobs)
}