export function validationColor(input, validation) {
    if(validation.textContent == '') {
        input.style.borderColor = 'black'
        validation.style.color = 'black'
    } else {
        input.style.borderColor = '#9B2226'
        validation.style.color = '#9B2226'

    }
}