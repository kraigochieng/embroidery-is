import { sectionWithParagraph } from "./sectionWithParagraph.js";
import { instructionTableDetailsComponent } from "./instructionTableDetails.js";

export function instructionDetailsComponent(formatName, lettersName, instructions) {
    let section = document.createElement('section');
    section.setAttribute('class', 'instruction-details');

    let format_and_letters_section = document.createElement('section');
    format_and_letters_section.className = 'instruction-details-format-and-letters'

    let format = sectionWithParagraph('instruction-details-format', 'Format', formatName);
    format_and_letters_section.appendChild(format)

    let letters = sectionWithParagraph('instruction-details-letters', 'Name', lettersName);
    format_and_letters_section.appendChild(letters)

    section.appendChild(format_and_letters_section)
    let table = instructionTableDetailsComponent(instructions);
    section.appendChild(table);

    return section;
}