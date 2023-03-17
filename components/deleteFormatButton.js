export function deleteFormatButton(){
    let button = document.createElement('button');
    // Set Attribute
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'delete-format-button');
    // Add text
    button.textContent = "X";

    return button;
}