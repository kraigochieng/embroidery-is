export function dateAndTimeComponent(headerText, date_and_time) {
    let container = document.createElement('section');
    let header = document.createElement('p');
    let date = document.createElement('span');
    let time = document.createElement('span');

    date.setAttribute('class', 'date');
    time.setAttribute('class', 'time');

    date.textContent = date_and_time.date;
    time.textContent = date_and_time.time;
    header.textContent = headerText;
    
    container.appendChild(date);
    container.appendChild(time);

    return container;
}