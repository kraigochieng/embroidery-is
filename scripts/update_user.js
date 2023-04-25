import { emailRegex } from "../functions/emailRegex.js";
import { isEmpty } from "../functions/isEmpty.js";
import { fetchUser } from "./read_users.js";

let current = {
    username: '',
    email: ''
}

export async function viewUpdateUser() {
    let user_id = sessionStorage.getItem('edit_user_id')
    let user = await fetchUser(user_id)

    let username = document.querySelector('#username-update');
    let email = document.querySelector('#email-update');
    let first_name = document.querySelector('#first-name-update');
    let last_name = document.querySelector('#last-name-update');

    // current
    current.username = user.username
    current.email = user.email

     // Give back values
     username.value = user.username;
     email.value = user.email;
     first_name.value = user.firstname;
     last_name.value = user.lastname;
}

let username = document.querySelector('#username-update');
let username_validation = document.querySelector('#username-update-validation');
let isUsernameValid = true

let email = document.querySelector('#email-update');
let email_validation = document.querySelector('#email-update-validation');
let isEmailValid = true

let first_name = document.querySelector('#first-name-update');
let first_name_validation = document.querySelector('#first-name-update-validation');
let isFirstNameValid = true

let last_name = document.querySelector('#last-name-update');
let last_name_validation = document.querySelector('#last-name-update-validation')
let isLastNameValid = true 

export async function fetchUsername(username) {
    let body = new FormData();
    body.append('username', username);

    let settings = { method: 'POST', body: body, } 

    let response = await fetch('../db/read_username.php', settings)
    let data = await response.json()

    return data
}

export async function fetchEmail(email) {
    let body = new FormData();
    body.append('email', email);

    let settings = { method: 'POST', body: body, } 

    let response = fetch('../db/read_email.php', settings)
    let data = await response.json()

    return data
}

username.addEventListener('input', usernameValidation);
export async function usernameValidation() {
    if(current.username === username.value) {
        // do nothing since it being the same is ok
        isUsernameValid = true;
    } else {
        let user = await fetchUsername(username.value)

        if(user.length === 0) {
            if(user.length === 0) {
                if(isEmpty(username.value)) {
                    username_validation.textContent = 'Add A Username';
                    isUsernameValid = false;
                } else {
                    username_validation.textContent = '';
                    isUsernameValid = true;
                }
            } else {
                username_validation.textContent = 'Username exists';
                isUsernameValid = false;
            }
        }
    }
        
}

email.addEventListener('input', emailValidation);
export async function emailValidation() {
    if(current.email === email.value) {
        // do nothing, since values are same
        isEmailValid = true;
    } else {
        let user = fetchUsername(email.value)
        // For unique
        if(user.length === 0) {
            // For Empty
            if(isEmpty(email.value)) {
                email_validation.textContent = 'Add Email';
                isEmailValid = false;
            } else {
            // For Email Validity
                if(emailRegex(email)) {
                    email_validation.textContent = '';
                    isEmailValid = true; 
                } else {
                    email_validation.textContent = 'Invalid Email';
                    isEmailValid = false; 
                }
            }
        } else {
            email_validation.textContent = 'Email already used';
            isEmailValid = false;
        }
    }
    
}

first_name.addEventListener('input', firstNameValidation);
export async function firstNameValidation() {
    if(isEmpty(first_name.value)) {
        first_name_validation.textContent = 'Add A First Name';
        isFirstNameValid = false;
    } else {
        first_name_validation.textContent = '';
        isFirstNameValid = true;
    }
}

last_name.addEventListener('input', lastNameValidation);
export async function lastNameValidation() {
    if(isEmpty(last_name.value)) {
        last_name_validation.textContent = 'Add A Last Name';
        isLastNameValid = false;
    } else {
        last_name_validation.textContent = '';
        isLastNameValid = true;
    }
}

export async function postUser(user_id) {
    let body = new FormData()
    body.append('user_id', user_id);
    body.append('username', username.value);
    body.append('email', email.value);
    body.append('first_name', first_name.value);
    body.append('last_name', last_name.value);

    let settings = { method: 'POST', body: body}

    await fetch('../db/update_user.php', settings)
}

export async function updateUser() {
    usernameValidation();
    emailValidation();
    firstNameValidation();
    lastNameValidation();

    if(
        isUsernameValid &&
        isEmailValid &&
        isFirstNameValid &&
        isLastNameValid
    ) {
        await postUser(sessionStorage.getItem('edit_user_id'))
    }
}

