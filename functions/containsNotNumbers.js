export function containsNotNumbers(element, validation, text = '* Only Letters') {
    let regex = /[^0-9]/;
    if(regex.test(element.value)) {
        validation.textContent = text;
        // console.log(element);
        return true;
    } else {
        return false;
    }
}