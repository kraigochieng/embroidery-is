// Getting DOM elemets
const username = document.querySelector('#username');
const usernameValidation = document.querySelector('#username-validation')
const password = document.querySelector('#password');
const passwordValidation = document.querySelector('#password-validation')
const loginButton = document.querySelector('#login-submit');

// Button event listener
loginButton.addEventListener('click', submitLoginForm);


function validateUsername(user) {
    if(user.length === 0) {
        return false;
    } else {
        return true;
    }
}

function comparePassword(trialPassword, correctPassword) {
    if(trialPassword == correctPassword) {
        return true;
    } else {
        return false;
    }
}

function submitLoginForm() {
    const loginData = new FormData();
    // Add form data
    loginData.append('username', username.value);

    // Send to server form data
    fetch('../db/login.php', {
        method: 'POST',
        body: loginData,
    })
    .then(response => response.json())
    .then(user => {
        // To check if username exists
        if(validateUsername(user) === false) {
            usernameValidation.textContent = "Username does not exist";
            passwordValidation.textContent = "";
            username.style.borderColor = "firebrick";
            password.style.borderColor = "black";
        } else {
            // user[0] is used since user is an array of objects
            if(comparePassword(password.value, user[0].password)) {
                // Set session variable
                sessionStorage.setItem('isLoggedIn', 'true');
                // Redirect to home page
                window.location.assign(`../index.html?user_id=${user[0].id}`);
            } else {
                usernameValidation.textContent = "";
                passwordValidation.textContent = "Invalid Password";
                username.style.borderColor = "black";
                password.style.borderColor = "firebrick";
            }
        }
    })
    
}