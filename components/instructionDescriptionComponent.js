export function instructionDescription() {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter Description');
    input.setAttribute('class', 'instruction-description');

    return input;
}