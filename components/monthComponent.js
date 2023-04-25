import { getMonth } from "../functions/getMonth.js"

export function monthComponent(month) {
    let radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'month-radio'
    radio.value = month
    radio.id = getMonth(month)
    radio.className = 'month-radio'

    let label = document.createElement('label')
    label.htmlFor = getMonth(month)
    label.textContent = getMonth(month)

    return {
        radio: radio,
        label: label
    }
}
