import { userComponent } from "../components/user.js";

let users_section = document.querySelector('#users');

export async function clearUsersSection() {
    users_section.innerHTML = '';
    console.log('cleared');
}

export async function fetchUsers() {
    users_section.innerHTML = '';
    
    fetch('../db/read_users.php')
    .then(response => response.json())
    .then(users => {
        for(let i = 0; i < users.length; i++) {
            let user = userComponent(users[i].id, users[i].username);
            users_section.appendChild(user);
        }
    })
    .catch(error => console.error(error));
}

export async function readUsers() {
    await clearUsersSection();
    await fetchUsers();
}

function closeUpdateUser() {
    let close_update_user_popup = document.querySelector('#close-update-user-popup');
    close_update_user_popup.addEventListener('click', function(){
        let update_user_section = document.querySelector('#update-user-section');
        update_user_section.style.transform = 'scale(0)';
    })
}

function closeDeleteUser() {
    let close_delete_user_popup = document.querySelector('#close-delete-user-popup');
    close_delete_user_popup.addEventListener('click', function(){
        let delete_user_section = document.querySelector('#delete-user-section');
        delete_user_section.style.transform = 'scale(0)';
    })
}

readUsers();
closeUpdateUser();
closeDeleteUser();