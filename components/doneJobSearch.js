export function doneJobSearch() {
    let done_job_search = document.createElement('input');
    done_job_search.setAttribute('id', 'done-job-search');
    done_job_search.setAttribute('class', 'job-search');
    done_job_search.setAttribute('placeholder', 'Done Job Search');
    return done_job_search;
}