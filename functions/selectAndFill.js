export function selectAndFill(id, text) {
    let element = document.querySelector(`#${id}`);
    element.textContent = text;
}