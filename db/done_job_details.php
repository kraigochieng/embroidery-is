<?php

include('../db/conn.php');
// Get Job Details
$job_id = $_POST['job_id'];
$read_job = $db->prepare('SELECT * FROM done_job_summary WHERE id = :job_id');
$read_job->execute(['job_id' => $job_id]);
$job = $read_job->fetch(PDO::FETCH_ASSOC);

// Get Individual Format and Letters
$read_format_and_letters = $db->prepare('SELECT * FROM format_and_letters WHERE job_id = :job_id');
$read_format_and_letters->execute(['job_id' => $job_id]);
$format_and_letters = $read_format_and_letters->fetchAll(PDO::FETCH_ASSOC);

// Get Instructions
$read_instructions = $db->prepare('SELECT * FROM instruction_details WHERE job_id = :job_id');
$read_instructions->execute(['job_id' => $job_id]);
$instructions = $read_instructions->fetchAll(PDO::FETCH_ASSOC);

// Append
$job['format_and_letters'] = $format_and_letters;
$job['instructions'] = $instructions;

exit(json_encode($job));

?>