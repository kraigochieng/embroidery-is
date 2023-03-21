import { positionRadioComponent } from "./positionRadio.js";
import { positionLabelComponent } from "./positionLabel.js";

export function positionComponent(id, item_name, name) {
    let position = {
        input: positionRadioComponent(id),
        label: positionLabelComponent(id, item_name, name),
    }

    // Set Attributes
    return position;
}