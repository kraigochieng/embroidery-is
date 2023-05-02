export function deleteInstructionButton() {
    // Create Element
    let button = document.createElement('button');
    // Set Attributes
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'delete-instruction');
    // Add text
    button.innerHTML = '&times;';

    return button;
}