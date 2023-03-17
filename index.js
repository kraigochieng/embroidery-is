// Components
function inProgressJobComponent(id,job_number, receiver_teller_username, hand_count, time_created) {
    // Create elements
    const in_progress_job = {
        container: document.createElement('section'),
        job_number: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        receiver_teller_username: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        hand_count: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        time_created: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        }
    }
    
    // Set attributes
    in_progress_job.container.setAttribute('id', id);
    in_progress_job.container.setAttribute('class', 'in-progress-job');
    in_progress_job.job_number.container.setAttribute('class', 'job-number-container');
    in_progress_job.job_number.label.setAttribute('class', 'job-number-label');
    in_progress_job.job_number.element.setAttribute('class', 'job-number');
    in_progress_job.receiver_teller_username.container.setAttribute('class', 'receiver-teller-username-number-container');
    in_progress_job.receiver_teller_username.label.setAttribute('class', 'receiver-teller-username-number-label');
    in_progress_job.receiver_teller_username.element.setAttribute('class', 'receiver-teller-username-number');
    in_progress_job.hand_count.container.setAttribute('class', 'hand-count-number-container');
    in_progress_job.hand_count.label.setAttribute('class', 'hand-count-number-label');
    in_progress_job.hand_count.element.setAttribute('class', 'hand-count-number');
    in_progress_job.time_created.container.setAttribute('class', 'time-created-number-container');
    in_progress_job.time_created.label.setAttribute('class', 'time-created-number-label');
    in_progress_job.time_created.element.setAttribute('class', 'time-created-number');
    
    // Add text
    in_progress_job.job_number.label.textContent = "Job Number";
    in_progress_job.job_number.element.textContent = job_number;
    in_progress_job.receiver_teller_username.label.textContent = "Receiver";
    in_progress_job.receiver_teller_username.element.textContent = receiver_teller_username;
    in_progress_job.hand_count.label.textContent = "Hand Count";
    in_progress_job.hand_count.element.textContent = hand_count;
    in_progress_job.time_created.label.textContent = "Time Created";
    in_progress_job.time_created.element.textContent = time_created;

    // Append 
    in_progress_job.job_number.container.appendChild(in_progress_job.job_number.label);
    in_progress_job.job_number.container.appendChild(in_progress_job.job_number.element);
    in_progress_job.receiver_teller_username.container.appendChild(in_progress_job.receiver_teller_username.label);
    in_progress_job.receiver_teller_username.container.appendChild(in_progress_job.receiver_teller_username.element);
    in_progress_job.hand_count.container.appendChild(in_progress_job.hand_count.label);
    in_progress_job.hand_count.container.appendChild(in_progress_job.hand_count.element);
    in_progress_job.time_created.container.appendChild(in_progress_job.time_created.label);
    in_progress_job.time_created.container.appendChild(in_progress_job.time_created.element);

    in_progress_job.container.appendChild(in_progress_job.job_number.container);
    in_progress_job.container.appendChild(in_progress_job.receiver_teller_username.container);
    in_progress_job.container.appendChild(in_progress_job.hand_count.container);
    in_progress_job.container.appendChild(in_progress_job.time_created.container);

    return in_progress_job.container;
}

function doneJobComponent(id,job_number, receiver_teller_username, confirmer_teller_username, hand_count, time_created) {
    // Create elements
    const done_job = {
        container: document.createElement('section'),
        job_number: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        receiver_teller_username: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        confirmer_teller_username: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        hand_count: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        },
        time_created: {
            container: document.createElement('section'),
            label: document.createElement('p'),
            element: document.createElement('p'),
        }
    }
    
    // Set attributes
    done_job.container.setAttribute('id', id);
    done_job.container.setAttribute('class', 'in-progress-job');
    done_job.job_number.container.setAttribute('class', 'job-number-container');
    done_job.job_number.label.setAttribute('class', 'job-number-label');
    done_job.job_number.element.setAttribute('class', 'job-number');
    done_job.receiver_teller_username.container.setAttribute('class', 'receiver-teller-username-number-container');
    done_job.receiver_teller_username.label.setAttribute('class', 'receiver-teller-username-number-label');
    done_job.receiver_teller_username.element.setAttribute('class', 'receiver-teller-username-number');
    done_job.confirmer_teller_username.container.setAttribute('class', 'confirmer-teller-username-number-container');
    done_job.confirmer_teller_username.label.setAttribute('class', 'confirmer-teller-username-number-label');
    done_job.confirmer_teller_username.element.setAttribute('class', 'confirmer-teller-username-number');
    done_job.hand_count.container.setAttribute('class', 'hand-count-number-container');
    done_job.hand_count.label.setAttribute('class', 'hand-count-number-label');
    done_job.hand_count.element.setAttribute('class', 'hand-count-number');
    done_job.time_created.container.setAttribute('class', 'time-created-number-container');
    done_job.time_created.label.setAttribute('class', 'time-created-number-label');
    done_job.time_created.element.setAttribute('class', 'time-created-number');
    
    // Add text
    done_job.job_number.label.textContent = "Job Number";
    done_job.job_number.element.textContent = job_number;
    done_job.receiver_teller_username.label.textContent = "Receiver";
    done_job.receiver_teller_username.element.textContent = receiver_teller_username;
    done_job.confirmer_teller_username.label.textContent = "Confirmer";
    done_job.confirmer_teller_username.element.textContent = confirmer_teller_username;
    done_job.hand_count.label.textContent = "Hand Count";
    done_job.hand_count.element.textContent = hand_count;
    done_job.time_created.label.textContent = "Time Created";
    done_job.time_created.element.textContent = time_created;

    // Append 
    done_job.job_number.container.appendChild(done_job.job_number.label);
    done_job.job_number.container.appendChild(done_job.job_number.element);
    done_job.receiver_teller_username.container.appendChild(done_job.receiver_teller_username.label);
    done_job.receiver_teller_username.container.appendChild(done_job.receiver_teller_username.element);
    done_job.confirmer_teller_username.container.appendChild(done_job.confirmer_teller_username.label);
    done_job.confirmer_teller_username.container.appendChild(done_job.confirmer_teller_username.element);
    done_job.hand_count.container.appendChild(done_job.hand_count.label);
    done_job.hand_count.container.appendChild(done_job.hand_count.element);
    done_job.time_created.container.appendChild(done_job.time_created.label);
    done_job.time_created.container.appendChild(done_job.time_created.element);

    done_job.container.appendChild(done_job.job_number.container);
    done_job.container.appendChild(done_job.receiver_teller_username.container);
    done_job.container.appendChild(done_job.confirmer_teller_username.container);
    done_job.container.appendChild(done_job.hand_count.container);
    done_job.container.appendChild(done_job.time_created.container);

    return done_job.container;
}

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
    window.location.assign('login.html'); // Go to login page if session variable is null
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
        fetch('in_progress_jobs.php', {
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
        fetch('in_progress_jobs.php', {
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

            fetch('done_jobs.php', {
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

        fetch('done_jobs.php', {
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
    fetch('in_progress_jobs.php')
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

