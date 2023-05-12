<?php

include('./conn.php');

$done_job_number = "";

// When searching...
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $done_job_number = $_POST['done_job_number'];
}

// Get in Progress Jobs
$read_done_jobs = $db->prepare('SELECT * FROM done_job_summary WHERE job_number LIKE :done_job_number LIMIT 10');
$read_done_jobs->execute(['done_job_number' => $done_job_number."%"]);
$done_jobs = $read_done_jobs->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($done_jobs));
?>