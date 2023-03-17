import { colourSelectComponent } from "./colourSelectComponent.js";
import { colourOptionComponent } from "./colourOptionComponent.js";

export function colourComponent() {
    let select = colourSelectComponent();

    fetch('colour.php')
        .then(response => response.json())
        .then(colours => {
            for(let i = 0; i < colours.length; i++) {
                let colour = colourOptionComponent(colours[i].id, colours[i].name);
                select.appendChild(colour);
            }
        })
    return select;
}