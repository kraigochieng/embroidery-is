import { currentDateMaker } from "../functions/currentDateMaker.js";

window.addEventListener('beforeunload', function(){
    let user_id = localStorage.getItem('user_id')
    let login_time = localStorage.getItem('login_time');
    let logout_time = currentDateMaker();
    
    let body = new FormData();

    body.append('user_id', user_id);
    body.append('login_time', login_time);
    body.append('logout_time', logout_time);

    fetch('../db/logout_time.php', {
        method: 'POST',
        body: body
    })
        .then(response => response.json())
        .then(user)
        .catch(error => console.error(error))
})