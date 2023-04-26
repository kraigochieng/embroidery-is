import { timeParser } from "../functions/timeParser.js";
import { sectionWithParagraph } from "./sectionWithParagraph.js";
import { dateAndTimeComponent } from "./dateAndTimeComponent.js";

export function doneJobComponent(id, job_number, telephone_number, description, receiver_teller_username, confirmer_teller_username, time_created, time_done, total_quantity) {
    // Parse Dates
    let start = timeParser(time_created);
    let end = timeParser(time_done);
    // Create elements
    let link = document.createElement('a');

    // let job_number_element = sectionWithParagraph('job-number', 'Job Number', job_number);
    // let telephone_number_element =  sectionWithParagraph('telephone-number', 'Telephone Number', telephone_number);
    let job_number_element = document.createElement('p')
    job_number_element.className = 'job-number'
    job_number_element.textContent = job_number

    let telephone_number_element = document.createElement('section');
    telephone_number_element.className = 'telephone-number-section'
    let phone_icon = document.createElement('img');
    phone_icon.className = 'phone-icon'
    phone_icon.src = '../icons/call.png';
    telephone_number_element.appendChild(phone_icon);

    let phone = document.createElement('p');
    phone.textContent = telephone_number;
    phone.className = 'telephone-number'
    telephone_number_element.appendChild(phone);

    
    // let description_element = sectionWithParagraph('description', 'Description', description);
    // let total_quantity_element = sectionWithParagraph('quantity', 'Quantity', total_quantity);
    // let receiver_teller_username_element =  sectionWithParagraph('receiver-teller-username','Received By', receiver_teller_username);
    // let confirmer_teller_username_element = sectionWithParagraph('confirmer-teller-username', 'Confirmed By', confirmer_teller_username);
    // let time_created_element = dateAndTimeComponent('Start', start);
    // let time_done_element = dateAndTimeComponent('End', end);

    link.setAttribute('id', id);
    link.setAttribute('class', 'done-job-link');
    link.setAttribute('href', `../pages/done_job_details.html?job_id=${id}`);

    link.appendChild(job_number_element);
    link.appendChild(telephone_number_element);
    // link.appendChild(description_element);
    // link.appendChild(total_quantity_element);
    // link.appendChild(receiver_teller_username_element);
    // link.appendChild(confirmer_teller_username_element);
    // link.appendChild(time_created_element);
    // link.appendChild(time_done_element);

    return link;
}