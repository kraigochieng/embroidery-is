export function colourOptionComponent(id, name){
    let option = document.createElement('option');
    option.setAttribute('value', id);
    option.setAttribute('class', 'colour-option');
    option.textContent = name;
    return option;
}