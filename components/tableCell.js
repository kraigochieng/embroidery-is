export function tableCellComponent(className, text) {
    let cell = document.createElement('td');
    cell.setAttribute('class', className);
    
    if(text === "") {
        cell.textContent = "-";
    } else {
        cell.textContent = text;
    }
    
    return cell;
}