export function instructionTableComponent() {
    let table = document.createElement('table');
    
    // Create Element
    let head = document.createElement('thead');
    let body = document.createElement('tbody');

    let head_row = document.createElement('tr');

    let item = document.createElement('th');
    let position = document.createElement('th');
    let colour = document.createElement('th');
    let quantity = document.createElement('th');
    let blank = document.createElement('th');
    let description = document.createElement('th');

    // Set Attribute
    table.setAttribute('class', 'instruction-table');
    head.setAttribute('class', 'instruction-table-row');
    body.setAttribute('class', 'instruction-table-body empty-table');
    // Add Text
    item.textContent = 'Item';
    position.textContent = 'Position';
    colour.textContent = 'Colour';
    quantity.textContent = 'Quantity';
    description.textContent = 'Description'
    // Append
    head_row.appendChild(item);
    head_row.appendChild(position);
    head_row.appendChild(colour);
    head_row.appendChild(quantity);
    head_row.appendChild(description);
    head_row.appendChild(blank);

    head.appendChild(head_row);

    table.appendChild(head);
    table.appendChild(body);

    return table;
}