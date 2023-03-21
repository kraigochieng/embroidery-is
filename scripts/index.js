// Components
import { inProgressJobComponent } from "../components/inProgressJob.js";
import { doneJobComponent } from "../components/doneJob.js";

function doneJobSearch() {
    let done_job_search = document.createElement('input');
    done_job_search.setAttribute('id', 'done-job-search');
    done_job_search.setAttribute('class', 'job-search');
    done_job_search.setAttribute('placeholder', 'Done Job Search');
    return done_job_search;
}

// Get session variable
const isLoggedIn = sessionStorage.getItem('isLoggedIn');

// 
if(isLoggedIn === null) {
    window.location.assign('../pages/login.html'); // Go to login page if session variable is null
} else {
    // DOM elements
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
    done_job_tab.addEventListener('click', showDoneJobs);

        // Search
    in_progress_job_search.addEventListener('input', showInProgressJobSearch);

    function showInProgressJobSearch() {
        const inProgressJobData = new FormData();
        inProgressJobData.append('in_progress_job_number', in_progress_job_search.value);
        
        jobs_container.innerHTML = "";

        // Add in progress jobs to container
        fetch('../db/in_progress_jobs.php', {
            method: 'POST',
            body: inProgressJobData
        })
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                let in_progress_job = inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].hand_count,
                    in_progress_jobs[i].time_created
                    );
                jobs_container.appendChild(in_progress_job);
            }
        })
        .catch(error => console.error(error))
    }

    function showInProgressJobs() {
        const inProgressJobData = new FormData();
        inProgressJobData.append('in_progress_job_number', in_progress_job_search.value);
        
        jobs_container.innerHTML = "";
        job_search_container.innerHTML = "";
        
        job_search_container.appendChild(in_progress_job_search);

        // Add in progress jobs to container
        fetch('../db/in_progress_jobs.php', {
            method: 'POST',
            body: inProgressJobData
        })
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                let in_progress_job = inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].hand_count,
                    in_progress_jobs[i].time_created
                    );
                jobs_container.appendChild(in_progress_job);
            }
        })
        .catch(error => console.error(error))
    }

    function showDoneJobs() {
        const doneJobData = new FormData();
        doneJobData.append('done_job_number', "");

        jobs_container.innerHTML = "";
        job_search_container.innerHTML = "";

        // Make the search bar be made and its functionalities be set
        let done_job_search = doneJobSearch();
        done_job_search.addEventListener('input',function(){
            const doneJobData = new FormData();
            doneJobData.append('done_job_number', this.value);

            jobs_container.innerHTML = "";

            fetch('../db/done_jobs.php', {
                method: 'POST',
                body: doneJobData,
            })
            .then(response => response.json())
            .then(done_jobs => {
                for(let i = 0; i < done_jobs.length; i++) {
                    let done_job = doneJobComponent(
                        done_jobs[i].id,
                        done_jobs[i].job_number,
                        done_jobs[i].receiver_teller_username,
                        done_jobs[i].confirmer_teller_username,
                        done_jobs[i].hand_count,
                        done_jobs[i].time_created
                        );
    
                    jobs_container.appendChild(done_job); 
                }
            })
            .catch(error => console.error(error))
        })
        
        job_search_container.appendChild(done_job_search);

        fetch('../db/done_jobs.php', {
            method: 'POST',
            body: doneJobData,
        })
        .then(response => response.json())
        .then(done_jobs => {
            for(let i = 0; i < done_jobs.length; i++) {
                let done_job = doneJobComponent(
                    done_jobs[i].id,
                    done_jobs[i].job_number,
                    done_jobs[i].receiver_teller_username,
                    done_jobs[i].confirmer_teller_username,
                    done_jobs[i].hand_count,
                    done_jobs[i].time_created
                    );

                jobs_container.appendChild(done_job); 
            }
        })
        .catch(error => console.error(error))
    }
    
    // Fetch data for in progress only 
    fetch('../db/in_progress_jobs.php')
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                let in_progress_job = inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].hand_count,
                    in_progress_jobs[i].time_created
                    );
                jobs_container.appendChild(in_progress_job);
            }
        })
        .catch(error => console.error(error))

        const label_radio = document.querySelectorAll('.label-radio');
        console.log(label_radio.length);
        for(let i = 0; i < label_radio.length; i++) {
            label_radio[i].addEventListener('click', function(){
                console.log(this.textContent);
            })
        }

}

