import { timeParser } from "../functions/timeParser.js";
import { fetchUser } from "./read_users.js";

export async function viewReadUser() {
    let user_id = sessionStorage.getItem('view_user_id')
    let user  = await fetchUser(user_id)
    
    let username = document.querySelector('#username-view');
    let email = document.querySelector('#email-view');
    let first_name = document.querySelector('#first-name-view');
    let last_name = document.querySelector('#last-name-view');
    let date_created  = document.querySelector('#time-created-view');
    let time_created  = document.querySelector('#date-created-view');
    let date_updated  = document.querySelector('#time-updated-view');
    let time_updated  = document.querySelector('#date-updated-view');

    
    username.textContent = user.username;
    email.textContent = user.email;
    first_name.textContent = user.firstname;
    last_name.textContent = user.lastname;
    let created = timeParser(user.time_created);
    time_created.textContent = created.time;
    date_created.textContent = created.date;
    console.log(user.time_updated)
    if(user.time_updated) {
        let updated = timeParser(user.time_updated)
        date_updated.textContent = updated.time;
        time_updated.textContent = updated.date;
    } else {
        date_updated.textContent = 'Never Updated';
        time_updated.textContent = 'Never Updated';
    }
    
}