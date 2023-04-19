import { tableCellComponent } from "./tableCell.js";

export function instructionRowDetailsComponent(itemName, positionName, colourName, quantityName, descriptionName) {
    let row = document.createElement('tr');
    row.setAttribute('class', 'instruction-details-row');

    let item = tableCellComponent('instruction-details-item', itemName);
    row.appendChild(item);

    let position = tableCellComponent('instruction-details-position', positionName);
    row.appendChild(position);

    let colour = tableCellComponent('instruction-details-colour', colourName);
    row.appendChild(colour);

    let quantity = tableCellComponent('instruction-details-quantity', quantityName);
    row.appendChild(quantity);
    
    let description = tableCellComponent('instruction-details-description', descriptionName);
    row.appendChild(description);

    return row;
}