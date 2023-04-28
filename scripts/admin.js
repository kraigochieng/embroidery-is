let back_to_jobs = document.querySelector('#back-to-jobs')
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');
back_to_jobs.setAttribute('href', `../index.html?user_id=${user_id}`)