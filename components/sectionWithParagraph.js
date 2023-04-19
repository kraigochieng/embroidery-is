export function sectionWithParagraph(className, labelText, text) {
    let container = document.createElement('section');
    let label = document.createElement('p');
    let element = document.createElement('p');

    container.setAttribute('class', `${className}-section`);
    label.setAttribute('class', `${className}-label`);
    element.setAttribute('class', className);

    label.textContent = labelText;
    element.textContent = text;

    if(text === '') {
        element.textContent = '(None)';
    }

    container.appendChild(label);
    container.appendChild(element);

    return container;
}