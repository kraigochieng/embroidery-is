export function doneJobComponent(id,job_number, receiver_teller_username, confirmer_teller_username, hand_count, time_created) {
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