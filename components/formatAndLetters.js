import { formatComponent } from "./format.js";
import { lettersComponent } from "./letters.js";
import { deleteFormatButton } from "./deleteFormatButton.js";
import { formatValidation } from "./formatValidation.js";
import { lettersValidation } from "./lettersValidation.js";


export function formatAndLettersComponent() {
    let section = document.createElement('section');
    let format = formatComponent();
    let format_validation = formatValidation();
    let letters =  lettersComponent();
    let letters_validation = lettersValidation();
    let button = deleteFormatButton();
    section.setAttribute('class', 'format-and-name-choice');
    
    button.addEventListener('click', function(){
        this.parentNode.remove();
    })

    format.addEventListener('change', function(){
        let regex = /[^0-9]/;

        if(this.value === '') {
            format_validation.textContent = '* Add A Format';
        } else {
            format_validation.textContent = '';
        }
    })

    letters.addEventListener('input', function(){
        if(this.value === '') {
            letters_validation.textContent = '* Type a letter';
        } else {
            letters_validation.textContent = '';
        }
    })
    section.appendChild(format);
    section.appendChild(format_validation);
    section.appendChild(letters);
    section.appendChild(letters_validation);
    section.appendChild(button);

    return section;
}