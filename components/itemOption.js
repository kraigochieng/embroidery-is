export function itemOptionComponent(id, name){
    let option = document.createElement('option');
    option.setAttribute('value', id);
    option.setAttribute('class', 'item-option');
    option.textContent = name;
    return option;
}