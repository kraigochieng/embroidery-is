import { timeParser } from "../functions/timeParser.js";
import { sectionWithParagraph } from "./sectionWithParagraph.js";
import { dateAndTimeComponent } from "./dateAndTimeComponent.js";

export function inProgressJobComponent(id, job_number, telephone_number, description, receiver_teller_username, time_created, total_quantity) {
    // Parse Dates
    let start = timeParser(time_created);

    // Create elements
    let section = document.createElement('section');
    let input = document.createElement('input');
    let link = document.createElement('a');

    // let job_number_element = sectionWithParagraph('job-number', 'Job Number', job_number);
    // let telephone_number_element =  sectionWithParagraph('telephone-number', 'Telephone Number', telephone_number);
    let job_number_element = document.createElement('p')
    job_number_element.className = 'job-number'
    job_number_element.textContent = job_number
    
    let telephone_number_element = document.createElement('section');
    telephone_number_element.className = 'telephone-number-section'
    let phone_icon = document.createElement('img');
    phone_icon.src = '../icons/call.png';
    phone_icon.className = 'phone-icon'
    telephone_number_element.appendChild(phone_icon);

    let phone = document.createElement('p');
    phone.textContent = telephone_number;
    phone.className = 'telephone-number'
    telephone_number_element.appendChild(phone);
    // let description_element = sectionWithParagraph('description', 'Description', description);
    // let total_quantity_element = sectionWithParagraph('quantity', 'Quantity', total_quantity);
    // let receiver_teller_username_element =  sectionWithParagraph('receiver-teller-username','Received By', receiver_teller_username);
    // let time_created_element = dateAndTimeComponent('Start', start);

    section.setAttribute('id', id);
    section.setAttribute('class', 'job-section in-progress-job-section');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', id);
    input.setAttribute('value', id);
    input.setAttribute('name', 'updateStatus');
    input.setAttribute('class', 'in-progress-job-input');

    link.setAttribute('class', 'in-progress-job-link');
    link.setAttribute('href', `../pages/in_progress_job_details.html?job_id=${id}`);

    link.appendChild(job_number_element);
    link.appendChild(telephone_number_element);
    // link.appendChild(description_element);
    // link.appendChild(total_quantity_element);
    // link.appendChild(receiver_teller_username_element);
    // link.appendChild(time_created_element);

    section.appendChild(input);
    section.appendChild(link);
    
    return section;
}