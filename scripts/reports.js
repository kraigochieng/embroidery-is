d3.select('.hello').style('color', 'red');

let line_container = d3.select('#line-container');

let line_svg = line_container.append('svg');

line_svg.attr('width', 300);
line_svg.attr('height', 300);

let line = line_svg.append('line');

line.attr('x1', 50);
line.attr('y1', 50);

line.attr('x2', 250);
line.attr('y2', 250);

line.style('stroke', 'aqua');
line.style('stroke-width', 2);

let rectangle_container = d3.select('#rectangle-container');

let rectange_svg = rectangle_container.append('svg');

rectange_svg.attr('width', 200);
rectange_svg.attr('height', 200);

let rectangle = rectange_svg.append('rect');

rectangle.attr('x', 25);
rectangle.attr('y', 25);

rectangle.attr('width', 150);
rectangle.attr('height', 150);
rectangle.attr('fill', 'green');

let circle_container = d3.select('#circle-container');

let circle_svg = circle_container.append('svg');

circle_svg.attr('width', 200);
circle_svg.attr('height', 200);


fetch('../db/read_jobs_per_month.php')
    .then(response => response.json())
    .then(jobs_per_month => {
        console.log(jobs_per_month);
        // let line_graph_container = d3.select('#line-graph-container');

        // let path = line_graph_container.append('path');

        // let line = d3.line()
        //     .x(d => d.month)
        //     .y(d => d.total_jobs)
        
        // path.data([jobs_per_month])
        //     .attr("d", line)
        //     .attr("fill", "none")
        //     .attr("stroke", "red")
        let w = 400;
        let h = 50;

        let line = d3.svg.line()
                        .x(d => d.month)
                        .y(d => d.total_jobs)
                        .interpolate('linear');

        let svg = d3.select('#line-graph-container')
                    .append('svg')
                    .attr({
                        width: w,
                        height: h
                    })

        let path = svg.append("path")
                        .attr({
                            d:line(jobs_per_month),
                            'fill': 'none',
                            'stroke': 'blue'
                        })
    })