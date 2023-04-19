// Getting DOM elemets
const username = document.querySelector('#username');
const usernameValidation = document.querySelector('#username-validation')
const password = document.querySelector('#password');
const passwordValidation = document.querySelector('#password-validation')
const loginButton = document.querySelector('#login-submit');

// Button event listener
loginButton.addEventListener('click', submitLoginForm);

function setLoginTime(user_id) {
    // Getting the date in JS in format of SQL
    let pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    let login_time = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());

    let body = new FormData();

    body.append('user_id', user_id);
    body.append('login_time', login_time);
    
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('login_time', login_time);

    fetch('../db/login_time.php', {
        method: 'POST',
        body: body
    })
        .catch(error => console.error(error));
}

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
    loginData.append('password', password.value);

    // Send to server form data
    fetch('../db/login.php', {
        method: 'POST',
        body: loginData,
    })
    .then(response => response.json())
    .then(response => {
        // To check if username exists
        switch(parseInt(response.status)) {
            // Invalid Username
            case 1:
                usernameValidation.textContent = "Username does not exist";
                passwordValidation.textContent = "";
                username.style.borderColor = "firebrick";
                password.style.borderColor = "black";
                break;
            // Invalid Password
            case 2:
                usernameValidation.textContent = "";
                passwordValidation.textContent = "Invalid Password";
                username.style.borderColor = "black";
                password.style.borderColor = "firebrick";
                break;
            // Login
            case 3:
                // Set session variable
                sessionStorage.setItem('isLoggedIn', 'true');
                setLoginTime(response.user_id);
                // Redirect to home page
                window.location.assign(`../index.html?user_id=${response.user_id}`);
                break;
        }
    })
}

