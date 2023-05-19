import { userComponent } from "../components/user.js";
import { updateUser } from "./update_user.js";

const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');

let back_to_admin = document.querySelector('#back-to-admin')
back_to_admin.setAttribute('href', `../pages/admin.html?user_id=${user_id}`)

function addBackground() {
    let users_section = document.querySelector('#users')
    users_section.style.opacity = '0.3'
    let open_create_user_popup= document.querySelector("#open-create-user-popup")
    open_create_user_popup.style.opacity = '0.3'
}

function removeBackground() {
    let users_section = document.querySelector('#users')
    users_section.style.opacity = '1'
    let open_create_user_popup= document.querySelector("#open-create-user-popup")
    open_create_user_popup.style.opacity = '1'
}

export async function fetchUsers() {
    let response = await fetch('../db/read_users.php')
    let data = response.json()
    return data
}

export async function fetchUser(user_id) {
    let body = new FormData();
    body.append('user_id', user_id);

    let settings = {
        method: 'POST',
        body: body
    }

    let response = await fetch('../db/read_user.php', settings)
    let data = response.json()
    return data
}

// Add users to view
async function viewUsers() {
    let users_section = document.querySelector('#users')
    users_section.innerHTML = ''
    let users = await fetchUsers()
    // Fetch Users Number
    let users_number = document.querySelector('#users-number')
    users_number.textContent = users.length 
    for(let i = 0; i < users.length; i++) {
        let user = userComponent(users[i].id, users[i].username);
        users_section.appendChild(user);
    }
}

// Close Update User
let close_update_user_popup = document.querySelector('#close-update-user-popup');
close_update_user_popup.addEventListener('click', closeUpdateUserPopup)
export async function closeUpdateUserPopup() {
    let update_user_section = document.querySelector('#update-user-section');
    update_user_section.style.transform = 'scale(0)';
    removeBackground()
}

// Close Delete
let close_delete_user_popup = document.querySelector('#close-delete-user-popup');
close_delete_user_popup.addEventListener('click', closeDeleteUserPopup)
export async function closeDeleteUserPopup() {
    let delete_user_section = document.querySelector('#delete-user-section');
    delete_user_section.style.transform = 'scale(0)';
    removeBackground()
}

// Close Details
let close_view_user_popup = document.querySelector('#close-view-user-popup');
close_view_user_popup.addEventListener('click', closeViewUserPopup)
export async function closeViewUserPopup() {
    let view_user_section = document.querySelector('#view-user-section');
    view_user_section.style.transform = 'scale(0)';
    removeBackground()
}

// Delete User
let delete_user = document.querySelector('#delete-user-yes');
delete_user.addEventListener('click', async () => await deleteUser(sessionStorage.getItem('delete_user_id')))
async function deleteUser(user_id) {
    let body = new FormData()
    body.append('user_id', user_id)

    let settings = {
        method: 'POST',
        body: body
    }

    // Delete
    await fetch('../db/delete_user.php', settings)
        .then(alert('A user has been deleted'))

    await closeDeleteUserPopup()
   
    await viewUsers()
}

// Cancel Delete
let delete_user_no = document.querySelector('#delete-user-no');
delete_user_no.addEventListener('click', async() => await closeDeleteUserPopup())

// Update User
let update_user = document.querySelector('#update-user')
update_user.addEventListener('click', async () => {
    updateUser()
})

// View Users
await viewUsers()

// Open Create User Popup
let open_create_user_popup = document.querySelector('#open-create-user-popup')
open_create_user_popup.addEventListener('click', openCreateUserPopup)

function openCreateUserPopup() {
    let create_user_section = document.querySelector('#create-user-section');
    create_user_section.style.transform = 'scale(1)'
    addBackground()

}
// Close Create User Popup
let close_create_user_popup = document.querySelector('#close-create-user-popup');
close_create_user_popup.addEventListener('click', closeCreateUserPopup)
export async function closeCreateUserPopup() {
    let create_user_section = document.querySelector('#create-user-section');
    create_user_section.style.transform = 'scale(0)';
    removeBackground()
}
