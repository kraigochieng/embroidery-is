const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');

let back_to_jobs = document.querySelector('#back-to-jobs')
back_to_jobs.setAttribute('href', `../index.html?user_id=${user_id}`)

let user_management_link = document.querySelector('#user-management-link')
user_management_link.setAttribute('href', `../pages/read_users.html?user_id=${user_id}`)


let reports_link = document.querySelector('#reports-link')
reports_link.setAttribute('href', `../pages/reports.html?user_id=${user_id}`)