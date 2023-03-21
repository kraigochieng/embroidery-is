import { blankOption } from "./blankOption.js";

export function itemSelectComponent() {
    let select = document.createElement('select');
    select.setAttribute('name', 'item');
    select.setAttribute('id', 'item-select');

    let blank_option = blankOption('Choose An Item');

    select.appendChild(blank_option);
    return select;
}