import { positionImageComponent } from "./positionImageComponent.js";

export function positionLabelComponent(id, item_name, name) {
    let label =  document.createElement('label');

    label.setAttribute('id', id);
    label.setAttribute('for', id);
    label.setAttribute('class', `position-label`);
    // label.textContent = name;
    label.appendChild(positionImageComponent('images', item_name, name, 'png'));
    return label;
}

// Set Attributes

