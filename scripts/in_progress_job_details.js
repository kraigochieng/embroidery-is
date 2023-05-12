import { timeParser } from '../functions/timeParser.js'
import { selectAndFill } from '../functions/selectAndFill.js';
import { getUrlParam } from '../functions/getUrlParam.js';
import { instructionDetailsComponent } from '../components/instructionDetails.js';

// Setting Back Button
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');

let back_to_jobs = document.querySelector('#back-to-jobs')
back_to_jobs.setAttribute('href', `../index.html?user_id=${user_id}`)

// Get Job Number from URL
function updateJobSection(job) {
    selectAndFill('job-number', job.job_number);
    selectAndFill('telephone-number', job.telephone_number);
    selectAndFill('quantity-on-job', job.total_quantity);
    
    if(job.description) {
        selectAndFill('job-description', job.description);
    } else {
        selectAndFill('job-description', '(None)');
    }

    let date_and_time = timeParser(job.time_created);

    selectAndFill('date-created', date_and_time.date);
    selectAndFill('time-created', date_and_time.time);
    
    let format_and_letters = [];
    // Loop through all formats and names
    for(let i = 0; i < job.format_and_letters.length; i++) {
        // Loop through Instructions
        let instructions = [];
        for(let j = 0; j < job.instructions.length; j++ ) {
            if(
                job.format_and_letters[i].format_id === job.instructions[j].format_id &&
                job.format_and_letters[i].letters === job.instructions[j].letters 
            ) {
                instructions.push(job.instructions[j]);
            }
        }
        format_and_letters.push(instructions);
    }

    for(let i = 0; i < job.format_and_letters.length; i++) {
        let instruction_details_section = document.querySelector('#instruction-details-section');
        let instruction_details = instructionDetailsComponent(job.format_and_letters[i].name, job.format_and_letters[i].letters, format_and_letters[i]);
        instruction_details_section.appendChild(instruction_details);
    }
    console.log(format_and_letters);
}

function fetchJob() {
    let body = new FormData()
    let job_id = getUrlParam('job_id');
    body.append('job_id', job_id);
    
    fetch('../db/in_progress_job_details.php', {
        method: 'POST',
        body: body,
    })
        .then(response => response.json())
        .then(job => {
            updateJobSection(job),
            console.log(job);
        })
        .catch(error => console.error(error));
}

function backToHome() {
    let back_to_home = document.querySelector('#back-to-home');

    let user_id = localStorage.getItem('user_id');

    back_to_home.setAttribute('href', `../index.html?user_id=${user_id}`);
}

// Functions
backToHome();
fetchJob();


