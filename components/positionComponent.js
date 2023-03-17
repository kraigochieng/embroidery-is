import { positionRadioComponent } from "./positionRadioComponent.js";
import { positionLabelComponent } from "./positionLabelComponent.js";

export function positionComponent(id, item_name, name) {
    let position = {
        input: positionRadioComponent(id),
        label: positionLabelComponent(id, item_name, name),
    }

    // Set Attributes
    return position;
}