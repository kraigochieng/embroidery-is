export function inProgressJobComponent(id,job_number, receiver_teller_username, hand_count, time_created) {
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