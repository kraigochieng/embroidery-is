import { jobsPerYear } from "./jobs_per_year.js"

let topic = document.querySelector('#topic')
let duration = document.querySelector('#duration')

// Draw First Graph
bar()

topic.addEventListener('change', changeGraph)
duration.addEventListener('change', changeGraph)

async function changeGraph() {
    let svg = document.querySelector('svg')
    svg.innerHTML = ''
    if(topic.value == 'job' && duration.value == 'year') {
        await bar()
    }
}