import { formatComponent } from "./format.js";
import { lettersComponent } from "./letters.js";
import { deleteFormatButton } from "./deleteFormatButton.js";
import { formatValidation } from "./formatValidation.js";
import { lettersValidation } from "./lettersValidation.js";


export function formatAndLettersComponent() {
    let section = document.createElement('section');

    let format_and_name_inputs_and_validations = document.createElement('section')
    format_and_name_inputs_and_validations.className = 'format-and-name-inputs-and-validations'
    
    let format = formatComponent();
    let format_validation = formatValidation();
    let format_and_validation = document.createElement('section')
    format_and_validation.className = 'format-input-and-validation'

    let letters =  lettersComponent();
    let letters_validation = lettersValidation();
    let letters_and_validation = document.createElement('section')
    letters_and_validation.className = 'letters-input-and-validation'

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
    
    format_and_validation.appendChild(format)
    format_and_validation.appendChild(format_validation)

    letters_and_validation.appendChild(letters)
    letters_and_validation.appendChild(letters_validation)

    // format_and_name_inputs_and_validations.appendChild(format_and_validation)
    // format_and_name_inputs_and_validations.appendChild(letters_and_validation)

    section.appendChild(format_and_validation)
    section.appendChild(letters_and_validation)

    // section.appendChild(format_and_name_inputs_and_validations)
    section.appendChild(button);

    return section;
}