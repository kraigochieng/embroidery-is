import { timeParser } from '../functions/timeParser.js';
import { readUsers } from './read_users.js';
import { clearUsersSection } from './read_users.js';

export function deleteUser() {
    let userBody = new FormData();
    userBody.append('user_id', sessionStorage.getItem('delete_user_id'));

    fetch('../db/read_user.php', {
        method: 'POST',
        body: userBody
    })
        .then(response => response.json())
        .then(user => {
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

            let delete_user = document.querySelector('#delete-user-yes');

            function deleteUserHandler() {
                fetch('../db/delete_user.php', {
                    method: 'POST',
                    body: userBody
                })
                    .then(response => response.text())
                    .then(res => {
                        let delete_user_section = document.querySelector('#delete-user-section');
                        delete_user_section.style.transform = 'scale(0)';

                        readUsers();
                        delete_user.removeEventListener('click', deleteUserHandler);
                    })
                    .catch(error => console.error(error));
            }
            delete_user.addEventListener('click', deleteUserHandler)

            

            let cancel_delete = document.querySelector('#delete-user-no');

            cancel_delete.addEventListener('click', function() {
                let delete_user_section = document.querySelector('#delete-user-section');
                delete_user_section.style.transform = 'scale(0)';
            })
        })
}