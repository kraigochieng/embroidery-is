export async function bar() { 
    async function readJobsPerYear() {
        let response = await fetch('../db/read_jobs_per_year.php')
        let jobs_per_year = await response.json()
        return jobs_per_year
    }

    // Get Data
    let jobs_per_year = await readJobsPerYear()

    let svg = d3.select('svg')
    let margin = 150
    let width = svg.attr('width') - margin
    let height = svg.attr('height') - margin

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

    // X label
    svg.append('text')
        .attr('x', svg.attr('width')/2)
        .attr('y', svg.attr('height') - 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'graph-label')
        .text('Year')

    // Y axis 
    g.append('g')
        .call(axis.y)
        .append("text")

    // Y label
    svg.append('text')
        // .attr('x', -(height - margin))
        // .attr('y', (width + margin)/2)
        // .attr('x', -((height + margin)/2))
        .attr('x', -svg.attr('height')/2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(270)`)
        .attr('class', 'graph-label')
        .text('Total Jobs')

    g.selectAll('.bar')
        .data(jobs_per_year)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => scale.x(d.year))
        .attr('y', d => scale.y(d.total_jobs))
        .attr('width', scale.x.bandwidth())
        .attr('height', d => height - scale.y(d.total_jobs))
        .append("title")
        .attr('class', 'tooltip')
        .text(d => d.total_jobs)
}