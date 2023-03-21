export function isContainerBlank(container, validation, text = '* Add Something') {
    if(container.childElementCount == 0) {
        // console.log(container);
        validation.textContent = text;
        return true;
    } else {
        return false;
    }
}