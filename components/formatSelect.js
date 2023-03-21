import { blankOption } from "./blankOption.js";

export function formatSelectComponent() {
    let select = document.createElement('select');
    select.setAttribute('class', 'format-select');
    let blank_option = blankOption('Choose A Format');
    select.appendChild(blank_option);
    return select;
}