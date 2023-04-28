import { emailRegex } from "../functions/emailRegex.js";
import { isEmpty } from "../functions/isEmpty.js";

let username = document.querySelector('#username-create');
let username_validation = document.querySelector('#username-create-validation');
let isUsernameValid = false;

let email = document.querySelector('#email-create');
let email_validation = document.querySelector('#email-create-validation');
let isEmailValid = false;

let first_name = document.querySelector('#first-name-create');
let first_name_validation = document.querySelector('#first-name-create-validation');
let isFirstNameValid = false;

let last_name = document.querySelector('#last-name-create');
let last_name_validation = document.querySelector('#last-name-create-validation');
let isLastNameValid = false;

let password = document.querySelector('#password-create');
let password_view = document.querySelector('#password-create-view');
let password_validation = document.querySelector('#password-create-validation');
let isPasswordValid = false;

let confirm_password = document.querySelector('#confirm-password-create');
let confirm_password_view = document.querySelector('#confirm-password-create-view');
let confirm_password_validation = document.querySelector('#confirm-password-create-validation');
let isConfirmPasswordValid = false;

let create_user = document.querySelector('#create-user');

username.addEventListener('input', usernameValidation);
function usernameValidation() {
    let usernameBody = new FormData();
    let username = document.querySelector('#username-create');
    let username_validation = document.querySelector('#username-create-validation');
    usernameBody.append('username', username.value);
    // Get usernames
    fetch('../db/read_username.php', {
        method: 'POST',
        body: usernameBody,
    })
        .then(response => response.json())
        .then(user => {
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
        })
        .catch(error => console.error(error));    
}

email.addEventListener('input', emailValidation);
function emailValidation() {
    let emailBody = new FormData();
    let email = document.querySelector('#email-create');
    let email_validation = document.querySelector('#email-create-validation');
    emailBody.append('email', email.value);
    // Get usernames
    fetch('../db/read_email.php', {
        method: 'POST',
        body: emailBody,
    })
        .then(response => response.json())
        .then(user => {
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
        })
        .catch(error => console.error(error)); 
}

first_name.addEventListener('input', firstNameValidation);
function firstNameValidation() {
    if(isEmpty(first_name.value)) {
        first_name_validation.textContent = 'Add A First Name';
        isFirstNameValid = false;
    } else {
        first_name_validation.textContent = '';
        isFirstNameValid = true;
    }
}

last_name.addEventListener('input', lastNameValidation);
function lastNameValidation() {
    if(isEmpty(last_name.value)) {
        last_name_validation.textContent = 'Add A Last Name';
        isLastNameValid = false;
    } else {
        last_name_validation.textContent = '';
        isLastNameValid = true;
    }
}

password.addEventListener('input', passwordValidation);
function passwordValidation() {
    if(isEmpty(password.value)) {
        password_validation.textContent = 'Enter a Password';
        isPasswordValid = false;
    } else {
        password_validation.textContent = '';
        isPasswordValid = true;
    }
}

confirm_password.addEventListener('input', confirmPasswordValidation);
function confirmPasswordValidation() {
    if(password.value !== confirm_password.value) {
        confirm_password_validation.textContent = 'Passwords do not match';
        isConfirmPasswordValid = false;
    } else {
        confirm_password_validation.textContent = '';
        isConfirmPasswordValid = true;
    }
}

password_view.addEventListener('click', togglePasswordView);
function togglePasswordView() {
    if(password.value.length > 0) {
        if(password.type === 'password') {
            password.type = 'text';
            password_view.innerHTML = '&#127761;';
        } else {
            password.type = 'password';
            password_view.innerHTML = '&#127765;';
        }
    }
}

confirm_password_view.addEventListener('click', toggleConfirmPasswordView);
function toggleConfirmPasswordView() {
    if(confirm_password.value.length > 0) {
        if(confirm_password.type === 'password') {
            confirm_password.type = 'text';
            confirm_password_view.innerHTML = '&#127761;';
        } else {
            confirm_password.type = 'password';
            confirm_password_view.innerHTML = '&#127765;';
        }
    }
}
create_user.addEventListener('click', createUser);
function createUser() {
    usernameValidation();
    emailValidation();
    firstNameValidation();
    lastNameValidation();
    passwordValidation();

    if(
        isUsernameValid &&
        isEmailValid &&
        isFirstNameValid &&
        isLastNameValid &&
        isPasswordValid &&
        isConfirmPasswordValid
    ) {
        let userData = new FormData();
    
        userData.append('username', username.value);
        userData.append('email', email.value);
        userData.append('first_name', first_name.value);
        userData.append('last_name', last_name.value);
        userData.append('password', password.value);

        fetch('../db/create_user.php', {
            method: 'POST',
            body: userData
        })
            .then(response => response.json())
            .then(user => console.log(user))
            .then(window.location.reload())
            .catch(error => console.error(error));
    }
    
}