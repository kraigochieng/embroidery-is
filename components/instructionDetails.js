import { sectionWithParagraph } from "./sectionWithParagraph.js";
import { instructionTableDetailsComponent } from "./instructionTableDetails.js";

export function instructionDetailsComponent(formatName, lettersName, instructions) {
    let section = document.createElement('section');
    section.setAttribute('class', 'instruction-details');

    let format = sectionWithParagraph('instruction-details-format', 'Format', formatName);
    section.appendChild(format);

    let letters = sectionWithParagraph('instruction-details-letters', 'Name', lettersName);
    section.appendChild(letters);

    let table = instructionTableDetailsComponent(instructions);
    section.appendChild(table);

    return section;
}