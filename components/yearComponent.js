export function yearComponent(year) {
    let radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'year-radio'
    radio.value = year
    radio.id = year
    radio.className = 'year-radio'
    
    let radio_label = document.createElement('label')
    radio_label.htmlFor = year
    radio_label.textContent = year
    radio_label.className = 'year-radio-label'

    return {
        radio: radio,
        label: radio_label
    }
}
