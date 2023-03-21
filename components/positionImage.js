function positionLink(name) {
    let hyphenated_name = name.replaceAll(' ', '-');
    let lowercase_name = hyphenated_name.toLowerCase();
    return lowercase_name;
}

export function positionImageComponent(path, item, position, extension) {
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    let figcaption = document.createElement('figcaption');

    image.setAttribute('class', 'position-image');
    figcaption.setAttribute('class', 'position-figcaption');
    image.setAttribute('src', `${path}/${item.toLowerCase()}/${positionLink(position)}.${extension}`);

    figcaption.textContent = position;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    return figure;
}