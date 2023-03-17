import { formatComponent } from "./formatComponent.js";
import { lettersComponent } from "./lettersComponent.js";
import { deleteFormatButton } from "./deleteFormatButton.js";

export function formatAndLettersComponent() {
    let section = document.createElement('section');
    let format = formatComponent();
    let letters =  lettersComponent();
    let button = deleteFormatButton();

    section.setAttribute('class', 'format-and-name-choice');
    
    button.addEventListener('click', function(){
        this.parentNode.remove();
    })

    section.appendChild(format);
    section.appendChild(letters);
    section.appendChild(button);

    return section;
}