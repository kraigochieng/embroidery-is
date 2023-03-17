export function positionRadioComponent(id) {
    let input = document.createElement('input')
    // Set Attributes
    input.setAttribute('type', 'radio');
    input.setAttribute('id', id);
    input.setAttribute('class', `position-radio`);
    input.setAttribute('name', `position-radio`);
    input.setAttribute('value', id);

    return input;
}