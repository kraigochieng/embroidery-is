import { formatSelectComponent } from "./formatSelectComponent.js";
import { formatOptionComponent } from "./formatOptionComponent.js";

export function formatComponent() {
    // Create Element
    let select = formatSelectComponent();
    // Fetch Data
    fetch('format.php')
        .then(response => response.json())
        .then(formats => {
            for(let i = 0; i < formats.length; i++) {
                // Create Element 
                let option = formatOptionComponent(formats[i].id, formats[i].name);
                // Append Data
                select.appendChild(option);
            }
        })
        .catch(error => console.error(error));
    
    return select;
}