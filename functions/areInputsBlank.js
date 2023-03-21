import { isInputBlank } from "./isInputBlank.js";

export function areInputsBlank(elements, validations, text = '* Empty') {
    for(let i = 0; i < elements.length; i++) {
        isInputBlank(elements[i], validations[i], text);
    }
    // console.log(elements);
}