<?php

include('conn.php');

$in_progress_job_number = "";

// When searching...
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $in_progress_job_number = $_POST['in_progress_job_number'];
}

// Get in Progress Jobs
$read_in_progress_jobs = $db->prepare('SELECT * FROM in_progress_job WHERE job_number LIKE :in_progress_job_number');
$read_in_progress_jobs->execute(['in_progress_job_number' => $in_progress_job_number."%"]);
$in_progress_jobs = $read_in_progress_jobs->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($in_progress_jobs));
?>