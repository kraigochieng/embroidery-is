async function getFormatsPerInstruction() {
    let response = await fetch('../db/read_formats_per_instruction.php')
    return response.json()
}

let formats_per_instruction = await getFormatsPerInstruction()
let width = 640
let height = 640
let radius = 200
let padding = 80

let svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height)

let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); 

let scale = d3.scaleOrdinal()
                    .domain(formats_per_instruction)
                    .range(['#4daf4a','#377eb8','#ff7f00'])

let pie = d3.pie()
            .value(d => d.count)

let arc = g.selectAll('arc')
            .data(pie(formats_per_instruction))
            .enter()
            .append('g')
            

let path = d3.arc()
            .outerRadius(radius)
            .innerRadius(100)

arc.append('path')
    .attr('d', path)
    .attr('fill', d => scale(d.data.count))
    .attr('class', 'pie')

let label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 100)

arc.append("text")
    .attr("transform", d => `translate(${label.centroid(d)})`)
    .text(d => `${d.data.count}`)
    .attr('text-anchor', 'middle')
    .attr('width', '50px')
    
    
 