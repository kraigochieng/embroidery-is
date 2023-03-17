export function blankOption(text) {
    let option = document.createElement('option');
    option.textContent = text;
    option.setAttribute('value', '');
    option.setAttribute('selected', '');
    option.setAttribute('disabled', '');

    return option;
}