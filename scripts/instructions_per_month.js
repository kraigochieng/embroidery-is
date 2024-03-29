import { numberWithCommas } from "../functions/numbersWithCommas.js"
import { getMonth } from "../functions/getMonth.js"

async function getInstructionsPerMonth(year) {
    let body = new FormData()
    body.append('year', year)
    
    let settings = { method: 'POST', body: body }
    let response = await fetch('../db/read_instructions_per_month.php', settings)
    return response.json()
}

export async function instructionsPerMonth(year) { 
    // Get Data
    let instructions_per_month = await getInstructionsPerMonth(year)

    let svg = d3.select('svg')
    let margin = 150
    let width = svg.attr('width') - margin
    let height = svg.attr('height') - margin

    let max = {
        x: d3.max(instructions_per_month, d => d.month),
        y: d3.max(instructions_per_month, d => parseInt(d.total_quantity))
    }

    let domain = {
        x: instructions_per_month.map(d => d.month),
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
        x: d3.axisBottom(scale.x).tickFormat(d => getMonth(d)),
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
        .text('Month')

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
        .text('Total Instructions')

    g.selectAll('.bar')
        .data(instructions_per_month)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scale.x(d.month))
        .attr('y', d => scale.y(d.total_quantity))
        .attr('width', scale.x.bandwidth())
        .attr('height', d => height - scale.y(d.total_quantity))
        .append("title")
        .attr('class', 'tooltip')
        .text(d => `Total Money Made: ${numberWithCommas(d.total_quantity * 100)}`)
}

