import { itemSelectComponent } from "./itemSelectComponent.js";
import { itemOptionComponent } from "./itemOptionComponent.js";

export function itemComponent() {
    let select = itemSelectComponent();

    fetch('item.php')
        .then(response => response.json())
        .then(items => {
            for(let i = 0; i < items.length; i++) {
                let item = itemOptionComponent(items[i].id, items[i].name);
                select.appendChild(item);
            }
        })
    return select;
}