<?php
    include('./conn.php');

    $read_job_id = $db->prepare('SELECT id FROM job WHERE job_number = :job_number');
    $read_job_id->execute(["job_number" => $_POST["job_number"]]);
    $job = $read_job_id->fetch(PDO::FETCH_ASSOC);

    exit(json_encode($job))
?>
