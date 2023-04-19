<?php
include('./conn.php');

$create_job = $db->prepare($_POST["job_statement"]);
$create_job->execute([]);

$read_job_id = $db->prepare('SELECT id FROM job WHERE job_number = :job_number');
$read_job_id->execute(["job_number" => $_POST["job_number"]]);
$job = $read_job_id->fetch(PDO::FETCH_ASSOC);

$instruction_statement = $_POST["instruction_statement"];
$instruction_statement = str_replace("job_id_to_be_replaced", $job["id"], $instruction_statement);

$create_instruction = $db->prepare($instruction_statement);
$create_instruction->execute([]);

exit($job["id"]);
 
?>