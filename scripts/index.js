// Components
import { doneJobSearch } from "../components/doneJobSearch.js";
import { inProgressJobComponent } from "../components/inProgressJob.js";
import { doneJobComponent } from "../components/doneJob.js";

function setUserIdSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');

    localStorage.setItem('user_id', user_id);
}

function setAdminButton() {
    const user_id = localStorage.getItem('user_id');

    let body = new FormData();
    body.append('user_id', user_id);

    fetch('../db/role.php', {
        method: 'POST',
        body: body
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if(user.role_id === 3) {
                let go_to_admin = document.querySelector('#go-to-admin');
                go_to_admin.setAttribute('href', `../pages/admin.html?user_id=${user.id}`);
                
                let button = document.createElement('button');
                button.textContent = 'Go To Admin';

                go_to_admin.appendChild(button);
            }
        })
}
function fetchDoneJobs(container, body) {
    fetch('../db/done_jobs.php', {
        method: 'POST',
        body: body,
    })
        .then(response => response.json())
        .then(done_jobs => {
            for(let i = 0; i < done_jobs.length; i++) {
                let done_job = doneJobComponent(
                    done_jobs[i].id,
                    done_jobs[i].job_number,
                    done_jobs[i].telephone_number,
                    done_jobs[i].description,
                    done_jobs[i].receiver_teller_username,
                    done_jobs[i].confirmer_teller_username,
                    done_jobs[i].time_created,
                    done_jobs[i].time_done,
                    done_jobs[i].total_quantity,
                    );

                container.appendChild(done_job); 
            }
        })
        .catch(error => console.error(error))
}

function fetchInProgressJobs(container, body) {
    fetch('../db/in_progress_jobs.php', {
        method: 'POST',
        body: body,
    })
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                let in_progress_job = inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].telephone_number,
                    in_progress_jobs[i].description,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].time_created,
                    in_progress_jobs[i].total_quantity,
                    );

                container.appendChild(in_progress_job); 
            }
        })
        .catch(error => console.error(error))
}

function showMarkDone() {
    let mark_done = document.querySelector('#mark-done');
    mark_done.style.display = 'inline-block';
}

function hideMarkDone() {
    let mark_done = document.querySelector('#mark-done');
    mark_done.style.display = 'none';
}

function markDone() {
    let checkboxes = document.querySelectorAll('.in-progress-job-input');

    let job_ids = '';

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            if(job_ids.length === 0) {
                job_ids = checkboxes[i].getAttribute('id');
            } else {
                job_ids += `,${checkboxes[i].getAttribute('id')}`;
            }
        }
    }

    
    if(job_ids.length === 0) {
        // 
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const user_id = urlParams.get('user_id');

        let updateJobData = new FormData();
        updateJobData.append('confirmer_teller_id', user_id);
        updateJobData.append('job_ids', job_ids);

        fetch('../db/update_job_status.php', {
            method: 'POST',
            body: updateJobData,
        })
            .then(response => response.text())
            .then(jobs => console.log(jobs))
            .catch(error => console.log(error))

            

            window.location.assign(`../index.html?user_id=${user_id}`);
        
    }
    
    console.log(job_ids);
}
// Get session variable
const isLoggedIn = sessionStorage.getItem('isLoggedIn');

// 
if(isLoggedIn === null) {
    window.location.assign('../pages/login.html'); // Go to login page if session variable is null
} else {
    // DOM elements
        // Link
    let new_job_link = document.querySelector('#new-job-link');
    
    new_job_link.addEventListener('click', function(){
        const urlParams = new URLSearchParams(window.location.search);
        const user_id = urlParams.get('user_id');

        window.location.assign(`../pages/job.html?user_id=${user_id}`);
    })
        // Containers
    const jobs_container = document.querySelector('#jobs-container'); 
    const job_search_container = document.querySelector("#job-search-container");
        // Tabs
    const in_progress_job_tab = document.querySelector('#in-progress-job-tab');
    const done_job_tab = document.querySelector("#done-job-tab");
        // Search
    const in_progress_job_search = document.querySelector('#in-progress-job-search');
    
    // Event listeners
        // Tabs
    in_progress_job_tab.addEventListener('click', showInProgressJobs);
    in_progress_job_tab.addEventListener('click', showMarkDone);
    done_job_tab.addEventListener('click', showDoneJobs);
    done_job_tab.addEventListener('click', hideMarkDone);
        // Search
    in_progress_job_search.addEventListener('input', showInProgressJobSearch);

    function showInProgressJobSearch() {
        const inProgressJobData = new FormData();
        inProgressJobData.append('in_progress_job_number', in_progress_job_search.value);
        
        jobs_container.innerHTML = "";

        // Add in progress jobs to container
        fetchInProgressJobs(jobs_container, inProgressJobData);
    }

    function showInProgressJobs() {
        const inProgressJobData = new FormData();
        inProgressJobData.append('in_progress_job_number', in_progress_job_search.value);
        
        jobs_container.innerHTML = "";
        job_search_container.innerHTML = "";
        
        job_search_container.appendChild(in_progress_job_search);

        // Add in progress jobs to container
        fetchInProgressJobs(jobs_container, inProgressJobData);
    }

    function showDoneJobs() {
        // Create Clear Search
        const doneJobData = new FormData();
        doneJobData.append('done_job_number', "");
        // Clear Containers
        jobs_container.innerHTML = "";
        job_search_container.innerHTML = "";
        // Create Done Job Search Bar
        let done_job_search = doneJobSearch();
        // Search Functionality
        done_job_search.addEventListener('input',function(){
            // Get Search
            const doneJobData = new FormData();
            doneJobData.append('done_job_number', this.value);
            // Clear Container
            jobs_container.innerHTML = "";
            //Get Done Jobs
            fetchDoneJobs(jobs_container, doneJobData);
        })
        // Append Search Bar
        job_search_container.appendChild(done_job_search);
        // Add Done Jobs
        fetchDoneJobs(jobs_container, doneJobData);
    }
    // Set Session Variable
    await setUserIdSession();
    await setAdminButton();
    let inProgressJobData = new FormData();
    inProgressJobData.append('in_progress_job_number', '');
    fetchInProgressJobs(jobs_container, inProgressJobData);

    let mark_done = document.querySelector('#mark-done');

    mark_done.addEventListener('click', markDone);
}

