import { formatSelectComponent } from "./formatSelect.js";
import { formatOptionComponent } from "./formatOption.js";

export function formatComponent() {
    // Create Element
    let select = formatSelectComponent();
    let select_length = 0;
    
    // Fetch Data
    fetch('../db/format.php')
        .then(response => response.json())
        .then(formats => {
            select_length = formats.length + 1;
            for(let i = 0; i < formats.length; i++) {
                // Create Element 
                let option = formatOptionComponent(formats[i].id, formats[i].name);
            
                // Append Data
                select.appendChild(option);
            }
        })
        .catch(error => console.error(error));

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