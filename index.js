// Get session variable
const isLoggedIn = sessionStorage.getItem('isLoggedIn');

// 
if(isLoggedIn === null) {
    window.location.assign('login.html'); // Go to login page if session variable is null
} else {
    // Components
    function inProgressJobComponent(id,job_number, receiver_teller_username, hand_count, time_created) {
        return `<section id=${id}>
                    <p id="job-number">Job Number: ${job_number}</p>
                    <p id='receiver-teller-username'>Receiver: ${receiver_teller_username}</p>
                    <p id='hand-count'>Count: ${hand_count}</p>
                    <p id='time-created'>Time: ${time_created}</p>
                </section>`;
    }

    function doneJobComponent(id,job_number, receiver_teller_username, confirmer_teller_username, hand_count, time_created) {
        return `<section id=${id}>
                    <p id="job-number">Job Number: ${job_number}</p>
                    <p id='receiver-teller-username'>Receiver: ${receiver_teller_username}</p>
                    <p id='confirmer-teller-username'>Confirmer: ${confirmer_teller_username}</p>
                    <p id='hand-count'>Count: ${hand_count}</p>
                    <p id='time-created'>Time: ${time_created}</p>
                </section>`;
    }

    // DOM elements
        // Containers
    const in_progress_jobs_container = document.querySelector('#in-progress-jobs-container');
    const done_jobs_container = document.querySelector("#done-jobs-container");
        // Tabs
    const in_progress_job_tab = document.querySelector('#in-progress-job-tab');
    const done_job_tab = document.querySelector("#done-job-tab");
        // Search
    const in_progress_job_search = document.querySelector('#in-progress-job-search');
    const done_job_search = document.querySelector('#done-job-search');
    
    // Event listeners
        // Tabs
    in_progress_job_tab.addEventListener('click', showInProgressJobsContainer);
    
    function showInProgressJobsContainer() {
        in_progress_jobs_container.classList.remove('hidden');
        in_progress_job_search.classList.remove('hidden');
        done_jobs_container.classList.add('hidden');
        done_job_search.classList.add('hidden');
    }
    
    done_job_tab.addEventListener('click', showDoneJobsContainer);

    function showDoneJobsContainer() {
        in_progress_jobs_container.classList.add('hidden');
        in_progress_job_search.classList.add('hidden');
        done_jobs_container.classList.remove('hidden');
        done_job_search.classList.remove('hidden');
    }

        // Search
    in_progress_job_search.addEventListener('input', showInProgressJobs);

    function showInProgressJobs() {
        const inProgressJobData = new FormData();
        inProgressJobData.append('in_progress_job_number', in_progress_job_search.value);
        in_progress_jobs_container.innerHTML = "";
        fetch('in_progress_jobs.php', {
            method: 'POST',
            body: inProgressJobData
        })
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                in_progress_jobs_container.innerHTML += inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].hand_count,
                    in_progress_jobs[i].time_created
                    );
            }
        })
        .catch(error => console.error(error))
    }

    done_job_search.addEventListener('input', showDoneJobs);

    function showDoneJobs() {
        const doneJobData = new FormData();
        doneJobData.append('done_job_number', done_job_search.value);
        done_jobs_container.innerHTML = "";
        fetch('done_jobs.php', {
            method: 'POST',
            body: doneJobData,
        })
        .then(response => response.json())
        .then(done_jobs => {
            for(let i = 0; i < done_jobs.length; i++) {
                done_jobs_container.innerHTML += doneJobComponent(
                    done_jobs[i].id,
                    done_jobs[i].job_number,
                    done_jobs[i].receiver_teller_username,
                    done_jobs[i].confirmer_teller_username,
                    done_jobs[i].hand_count,
                    done_jobs[i].time_created
                    );
            }
        })
        .catch(error => console.error(error))
    }
    // Fetch data
    fetch('in_progress_jobs.php')
        .then(response => response.json())
        .then(in_progress_jobs => {
            for(let i = 0; i < in_progress_jobs.length; i++) {
                in_progress_jobs_container.innerHTML += inProgressJobComponent(
                    in_progress_jobs[i].id,
                    in_progress_jobs[i].job_number,
                    in_progress_jobs[i].receiver_teller_username,
                    in_progress_jobs[i].hand_count,
                    in_progress_jobs[i].time_created
                    );
            }
        })
        .catch(error => console.error(error))

        fetch('done_jobs.php')
        .then(response => response.json())
        .then(done_jobs => {
            for(let i = 0; i < done_jobs.length; i++) {
                done_jobs_container.innerHTML += doneJobComponent(
                    done_jobs[i].id,
                    done_jobs[i].job_number,
                    done_jobs[i].receiver_teller_username,
                    done_jobs[i].confirmer_teller_username,
                    done_jobs[i].hand_count,
                    done_jobs[i].time_created
                    );
            }
        })
        .catch(error => console.error(error))
}


