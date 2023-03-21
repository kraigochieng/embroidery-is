import { isContainerBlank } from "./isContainerBlank.js";

export function areContainersBlank(containers, validations, text = '* Add Something') {
    for(let i = 0; i < containers.length; i++) {
        isContainerBlank(containers[i], validations[i], text);
    }
}