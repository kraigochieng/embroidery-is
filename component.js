export function formatComponent() {
    let possible_format = document.createElement('select');
    possible_format.setAttribute('class', 'possible-format-select');

    let blank_option = document.createElement('option');
    blank_option.textContent = 'Choose A Format';
    blank_option.setAttribute('value', '');
    blank_option.setAttribute('selected', '');
    blank_option.setAttribute('disabled', '');

    possible_format.appendChild(blank_option);

    possible_format.setAttribute('name', 'format');
    for(let i = 0; i < formats.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('class', 'possible-format-option');
        option.setAttribute('value', formats[i].id);
        option.textContent = formats[i].name;
        possible_format.appendChild(option);
    }

    return possible_format;
}