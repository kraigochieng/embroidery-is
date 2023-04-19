import { deleteInstructionButton } from "./deleteInstruction.js";
import { instructionDescription } from "./instructionDescription.js";

export function instructionRowComponent(table_index,item, position, colour, quantity) {
    let instruction_row = {
        row: document.createElement('tr'),
        item: document.createElement('td'),
        position: document.createElement('td'),
        colour: document.createElement('td'),
        quantity: document.createElement('td'),
        description: document.createElement('td'),
        delete: document.createElement('td'),
    }

    // Set Attributes
    instruction_row.item.setAttribute('id', item.id);
    instruction_row.position.setAttribute('id', position.id);
    instruction_row.colour.setAttribute('id', colour.id);

    instruction_row.row.setAttribute('class', 'instruction-row');
    instruction_row.item.setAttribute('class', 'instruction-item');
    instruction_row.position.setAttribute('class', 'instruction-position');
    instruction_row.colour.setAttribute('class', 'instruction-colour');
    instruction_row.quantity.setAttribute('class', 'instruction-quantity');

    // Add text
    instruction_row.item.textContent = item.name;
    instruction_row.position.textContent = position.name;
    instruction_row.colour.textContent = colour.name;
    instruction_row.quantity.textContent = quantity;
    instruction_row.description.appendChild(instructionDescription());
    instruction_row.delete.appendChild(deleteInstructionButton());

    // Add Events
    instruction_row.delete.addEventListener('click', function(){
        this.parentNode.remove();
        let instruction_table_body = document.querySelectorAll('.instruction-table-body');
        if(instruction_table_body[table_index].childElementCount === 0) {
            instruction_table_body[table_index].setAttribute('class','instruction-table-body empty-table');
        }
    })
    // Add items
    instruction_row.row.appendChild(instruction_row.item);
    instruction_row.row.appendChild(instruction_row.position);
    instruction_row.row.appendChild(instruction_row.colour);
    instruction_row.row.appendChild(instruction_row.quantity);
    instruction_row.row.appendChild(instruction_row.description);
    instruction_row.row.appendChild(instruction_row.delete);

    return instruction_row;
}