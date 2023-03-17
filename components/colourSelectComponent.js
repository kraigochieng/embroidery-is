import { blankOption } from "./blankOption.js";

export function colourSelectComponent() {
    let select = document.createElement('select');
    select.setAttribute('name', 'item');
    select.setAttribute('id', 'colour-select');

    let blank_option = blankOption('Choose A Colour');

    select.appendChild(blank_option);
    return select;
}