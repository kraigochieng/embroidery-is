import { timeParser } from '../functions/timeParser.js';
import { fetchUser } from './read_users.js';

export async function viewDeleteUser() {
    let user_id = sessionStorage.getItem('delete_user_id')
    let user  = await fetchUser(user_id)
    
    let username = document.querySelector('#username-delete');
    let email = document.querySelector('#email-delete');
    let first_name = document.querySelector('#first-name-delete');
    let last_name = document.querySelector('#last-name-delete');
    let time_created  = document.querySelector('#time-created-delete');
    let date_created  = document.querySelector('#date-created-delete');
    
    username.textContent = user.username;
    email.textContent = user.email;
    first_name.textContent = user.firstname;
    last_name.textContent = user.lastname;
    let created = timeParser(user.time_created);
    time_created.textContent = created.time;
    date_created.textContent = created.date;
}
