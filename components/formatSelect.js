import { blankOption } from "./blankOption.js";

export function formatSelectComponent() {
    let select = document.createElement('select');
    select.setAttribute('class', 'format-and-name-input format-select');
    let blank_option = blankOption('Choose A Format');
    blank_option.className = 'blank-format'
    select.appendChild(blank_option);
    return select;
}