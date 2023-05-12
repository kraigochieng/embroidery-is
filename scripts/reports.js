import { getMonth } from "../functions/getMonth.js"

import { jobsPerHour } from "./jobs_per_hour.js"
import { jobsPerDay } from "./jobs_per_day.js"
import { jobsPerMonth } from "./jobs_per_month.js"
import { jobsPerYear } from "./jobs_per_year.js"

import { instructionsPerHour } from "./instructions_per_hour.js"
import { instructionsPerDay } from "./instructions_per_day.js"
import { instructionsPerMonth } from "./instructions_per_month.js"
import { instructionsPerYear } from "./instructions_per_year.js"

const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');

let back_to_admin = document.querySelector('#back-to-admin')
back_to_admin.setAttribute('href', `../pages/admin.html?user_id=${user_id}`)

function sectionComponent(name) {
    let section = document.createElement('section')
    section.className = `period-section ${name}-section`
    return section
}

function labelComponent(name, text) {
    let label = document.createElement('label')
    label.htmlFor = name
    label.textContent = text
    return label
}

function selectComponent(name) {
    let select = document.createElement('select')
    select.name = name
    select.id = name
    return select
}

function optionComponent(name, text) {
    let option = document.createElement('option')
    option.value = name
    option.textContent = text
    return option
}

function clearGraph() {
    let svg = document.querySelector('svg')
    svg.innerHTML = ''
}

function clearPeriod() {
    let period = document.querySelector('#period')
    period.innerHTML = ''
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

async function getDays(year, month) {
    let body = new FormData()
    body.append('year', year)
    body.append('month', month)

    let settings = { method: 'POST', body: body}
    let response = await fetch('../db/read_days.php', settings)
    return response.json()
}

let topic = document.querySelector('#topic')
let duration = document.querySelector('#duration')
let period = document.querySelector('#period')

// Draw First Graph
jobsPerYear()

topic.addEventListener('change', changeGraph)
duration.addEventListener('change', changeGraph)

async function changeGraph() {
    clearGraph()
    clearPeriod()
    if(topic.value == 'job') {
        if (duration.value == 'year') {
            await jobsPerYear()
        } else if (duration.value == 'month') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_label = labelComponent('year', 'Year')
            let year_select = selectComponent('year') // Year Select
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }
            year_select.value = years[years.length - 1].year // Select Last Year
            await jobsPerMonth(year_select.value) // Draw First Graph
            
            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section) // Add Years To Period
            
            year_select.addEventListener('change', async ()=> {
                clearGraph()
                await jobsPerMonth(year_select.value)
            })
        } else if (duration.value == 'day') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_select = selectComponent('year') // Year Select
            let year_label = labelComponent('year','Year')
            // Year Option
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }
            year_select.value = years[years.length - 1].year // Select Last Year

            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section)

            let months = await getMonths(year_select.value) // get Months
            let month_section = sectionComponent('month')
            let month_label = labelComponent('month','Month')
            let month_select = selectComponent('month') // Month Select
            // Year Option
            for(let i = 0; i < months.length; i++) {
                let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                month_select.appendChild(month_option) // Append Option to select
            }
             
            month_select.value = months[months.length - 1].month // Select Last Month
            
            month_section.appendChild(month_label)
            month_section.appendChild(month_select)

            period.appendChild(month_section)
             
            await jobsPerDay(year_select.value, month_select.value) // Draw First Graph
             
            year_select.addEventListener('change', async () => {
                clearGraph()
                let months = await getMonths(year_select.value) // get Months
                month_select.innerHTML = ''
                for(let i = 0; i < months.length; i++) {
                    let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                    month_select.appendChild(month_option) // Append Option to select
                }
                
                month_select.value = months[months.length - 1].month // Select Last Month
                await jobsPerDay(year_select.value, month_select.value)
            })

            month_select.addEventListener('change', async () => {
                clearGraph()
                await jobsPerDay(year_select.value, month_select.value)
            })
        } else if(duration.value == 'hour') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_select = selectComponent('year') // Year Select
            let year_label = labelComponent('year','Year')
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }

            year_select.value = years[years.length - 1].year // Select Last Year
            
            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section)

            let months = await getMonths(year_select.value) // get Months
            let month_section = sectionComponent('month')
            let month_label = labelComponent('month', 'Month')
            let month_select = selectComponent('month') // Month Select
            for(let i = 0; i < months.length; i++) {
                let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                month_select.appendChild(month_option) // Append Option to select
            }
            month_select.value = months[months.length - 1].month // Select Last Month
            
            month_section.appendChild(month_label)
            month_section.appendChild(month_select)

            period.appendChild(month_section)

            let days = await getDays(year_select.value, month_select.value) // get days
            let day_section = sectionComponent('day')
            let day_label = labelComponent('day', 'Day')
            let day_select = selectComponent('day') // Month Select
            for(let i = 0; i < days.length; i++) {
                let day_option = optionComponent(days[i].day, days[i].day)
                day_select.appendChild(day_option) // Append Option to select
            }
            day_select.value = days[days.length - 1].day // Select Last Month
            
            day_section.appendChild(day_label)
            day_section.appendChild(day_select)

            period.appendChild(day_section)

            await jobsPerHour(year_select.value, month_select.value, day_select.value) // Draw First Graph
             
            year_select.addEventListener('change', async () => {
                clearGraph()
                let months = await getMonths(year_select.value) // get Months
                month_select.innerHTML = ''
                for(let i = 0; i < months.length; i++) {
                    let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                    month_select.appendChild(month_option) // Append Option to select
                }
                
                month_select.value = months[months.length - 1].month // Select Last Month
                await jobsPerHour(year_select.value, month_select.value, day_select.value)
            })

            month_select.addEventListener('change', async () => {
                clearGraph()
                let days = await getDays(year_select.value, month_select.value) // get days
                day_select.innerHTML = ''
                for(let i = 0; i < days.length; i++) {
                    let day_option = optionComponent(days[i].day, days[i].day)
                    day_select.appendChild(day_option) // Append Option to select
                }
                day_select.value = days[days.length - 1].day // Select Last Month
    
                await jobsPerHour(year_select.value, month_select.value, day_select.value)
            })

            day_select.addEventListener('change', async () => {
                clearGraph()
                await jobsPerHour(year_select.value, month_select.value, day_select.value)
            })
        }
    } else if(topic.value == 'instruction') {
        if (duration.value == 'year') {
            await instructionsPerYear()
        } else if (duration.value == 'month') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_label = labelComponent('year', 'Year')
            let year_select = selectComponent('year') // Year Select
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }
            year_select.value = years[years.length - 1].year // Select Last Year
            await instructionsPerMonth(year_select.value) // Draw First Graph
            
            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section) // Add Years To Period
            
            year_select.addEventListener('change', async ()=> {
                clearGraph()
                await instructionsPerMonth(year_select.value)
            })
        } else if (duration.value == 'day') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_select = selectComponent('year') // Year Select
            let year_label = labelComponent('year','Year')
            // Year Option
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }
            year_select.value = years[years.length - 1].year // Select Last Year

            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section)

            let months = await getMonths(year_select.value) // get Months
            let month_section = sectionComponent('month')
            let month_label = labelComponent('month','Month')
            let month_select = selectComponent('month') // Month Select
            // Year Option
            for(let i = 0; i < months.length; i++) {
                let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                month_select.appendChild(month_option) // Append Option to select
            }
             
            month_select.value = months[months.length - 1].month // Select Last Month
            
            month_section.appendChild(month_label)
            month_section.appendChild(month_select)

            period.appendChild(month_section)
             
            await instructionsPerDay(year_select.value, month_select.value) // Draw First Graph
             
            year_select.addEventListener('change', async () => {
                clearGraph()
                let months = await getMonths(year_select.value) // get Months
                month_select.innerHTML = ''
                for(let i = 0; i < months.length; i++) {
                    let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                    month_select.appendChild(month_option) // Append Option to select
                }
                
                month_select.value = months[months.length - 1].month // Select Last Month
                await instructionsPerDay(year_select.value, month_select.value)
            })

            month_select.addEventListener('change', async () => {
                clearGraph()
                await instructionsPerDay(year_select.value, month_select.value)
            })
        } else if(duration.value == 'hour') {
            let years = await getYears() // Get Years
            let year_section = sectionComponent('year')
            let year_select = selectComponent('year') // Year Select
            let year_label = labelComponent('year','Year')
            for(let i = 0; i < years.length; i++) {
                let year_option = optionComponent(years[i].year, years[i].year)
                year_select.appendChild(year_option) // Append Option to select
            }

            year_select.value = years[years.length - 1].year // Select Last Year
            
            year_section.appendChild(year_label)
            year_section.appendChild(year_select)

            period.appendChild(year_section)

            let months = await getMonths(year_select.value) // get Months
            let month_section = sectionComponent('month')
            let month_label = labelComponent('month', 'Month')
            let month_select = selectComponent('month') // Month Select
            for(let i = 0; i < months.length; i++) {
                let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                month_select.appendChild(month_option) // Append Option to select
            }
            month_select.value = months[months.length - 1].month // Select Last Month
            
            month_section.appendChild(month_label)
            month_section.appendChild(month_select)

            period.appendChild(month_section)

            let days = await getDays(year_select.value, month_select.value) // get days
            let day_section = sectionComponent('day')
            let day_label = labelComponent('day', 'Day')
            let day_select = selectComponent('day') // Month Select
            for(let i = 0; i < days.length; i++) {
                let day_option = optionComponent(days[i].day, days[i].day)
                day_select.appendChild(day_option) // Append Option to select
            }
            day_select.value = days[days.length - 1].day // Select Last Month
            
            day_section.appendChild(day_label)
            day_section.appendChild(day_select)

            period.appendChild(day_section)

            await instructionsPerHour(year_select.value, month_select.value, day_select.value) // Draw First Graph
             
            year_select.addEventListener('change', async () => {
                clearGraph()
                let months = await getMonths(year_select.value) // get Months
                month_select.innerHTML = ''
                for(let i = 0; i < months.length; i++) {
                    let month_option = optionComponent(months[i].month, getMonth(months[i].month))
                    month_select.appendChild(month_option) // Append Option to select
                }
                
                month_select.value = months[months.length - 1].month // Select Last Month
                await instructionsPerHour(year_select.value, month_select.value, day_select.value)
            })

            month_select.addEventListener('change', async () => {
                clearGraph()
                let days = await getDays(year_select.value, month_select.value) // get days
                day_select.innerHTML = ''
                for(let i = 0; i < days.length; i++) {
                    let day_option = optionComponent(days[i].day, days[i].day)
                    day_select.appendChild(day_option) // Append Option to select
                }
                day_select.value = days[days.length - 1].day // Select Last Month
    
                await instructionsPerHour(year_select.value, month_select.value, day_select.value)
            })

            day_select.addEventListener('change', async () => {
                clearGraph()
                await instructionsPerHour(year_select.value, month_select.value, day_select.value)
            })
        }
    }
}