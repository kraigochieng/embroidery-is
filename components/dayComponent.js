export function dayComponent(day) {
    let radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'day-radio'
    radio.value = day
    radio.id = day
    radio.className = 'day-radio'
    
    let label = document.createElement('label')
    label.htmlFor = day
    label.textContent = day
    label.className = 'day-radio-label'

    return {
        radio: radio,
        label: label
    }
}
