<?php

include('../db/conn.php');

$read_jobs_per_hour = $db->prepare('SELECT * FROM jobs_per_hour WHERE year = :year AND month = :month AND day = :day');
$read_jobs_per_hour->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month'],
    'day' => $_POST['day']
]);
$jobs_per_hour = $read_jobs_per_hour->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($jobs_per_hour));

?>