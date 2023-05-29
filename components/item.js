import { itemSelectComponent } from "./itemSelect.js";
import { itemOptionComponent } from "./itemOption.js";

export function itemComponent() {
    let select = itemSelectComponent();
    let select_length = 0;

    fetch('../db/item.php')
        .then(response => response.json())
        .then(items => {
            select_length = items.length + 1;
            for(let i = 0; i < items.length; i++) {
                let item = itemOptionComponent(items[i].id, items[i].name);
                select.appendChild(item);
            }
        })

        // For options to appear on hover
        select.addEventListener('mouseover', function(){
            select.size = select_length;//toString(select_length);
        })

        // For options to disappear after click
        select.addEventListener('click', function(){
            select.size = 1;//toString(select_length);
        })

        // For options to disapear after hover
        select.addEventListener('mouseleave', function(){
            select.size = 1;
        })
    return select;
}