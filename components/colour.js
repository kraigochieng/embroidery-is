import { colourSelectComponent } from "./colourSelect.js";
import { colourOptionComponent } from "./colourOption.js";

export function colourComponent() {
    let select = colourSelectComponent();
    let select_length = 0;

    fetch('../db/colour.php')
        .then(response => response.json())
        .then(colours => {
            select_length = colours.length + 1;
            for(let i = 0; i < colours.length; i++) {
                let colour = colourOptionComponent(colours[i].id, colours[i].name);
                select.appendChild(colour);
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