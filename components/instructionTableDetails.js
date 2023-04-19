import { instructionRowDetailsComponent } from "./instructionRowDetails.js";
import { tableHeaderComponent } from "./tableHeader.js";

export function instructionTableDetailsComponent(instructions) {
    let table = document.createElement('table');
    table.setAttribute('class', 'instruction-table-details');

    let head = document.createElement('thead');
    head.setAttribute('class', 'instruction-table-details-row');
    table.appendChild(head);

    let body = document.createElement('tbody');
    body.setAttribute('class', 'instruction-table-details-body');
    table.appendChild(body);
    
    let head_row = document.createElement('tr');
    head.appendChild(head_row);

    let item_header = tableHeaderComponent('Item');
    head_row.appendChild(item_header);

    let position_header = tableHeaderComponent('Position')
    head_row.appendChild(position_header);

    let colour_header = tableHeaderComponent('Colour')
    head_row.appendChild(colour_header);

    let quantity_header = tableHeaderComponent('Quantity')
    head_row.appendChild(quantity_header);

    let description_header = tableHeaderComponent('Description')
    head_row.appendChild(description_header);

    for(let i = 0; i < instructions.length; i++) {
        let instruction = instructionRowDetailsComponent(
                instructions[i].item_name,
                instructions[i].position_name,
                instructions[i].colour_name,
                instructions[i].quantity,
                instructions[i].description
        );

        body.append(instruction);
    }

    return table;
}
