async function getJobsPerMonth() {
    let response = await fetch('../db/read_jobs_per_month.php')
    let data = response.json()
    return data
}

let jobs_per_month = await getJobsPerMonth()