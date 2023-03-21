export function isInputBlank(input, validation, text = '* Empty') {
    if(input.value === '') {
        validation.textContent = text;
        // console.log(input);
        return true;
    } else {
        return false;
    }
}