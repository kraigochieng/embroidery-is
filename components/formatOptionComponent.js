export function formatOptionComponent(id, name) {
    let option = document.createElement('option');
    option.setAttribute('class', 'possible-format-option');
    option.setAttribute('value', id);
    option.textContent = name;
    
    return option;
}
