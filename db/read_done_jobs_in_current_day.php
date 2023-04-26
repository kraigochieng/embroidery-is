<?php

include('../db/conn.php');

$read_done_jobs_in_current_day = $db->prepare('SELECT * FROM jobs_per_day WHERE year = :year AND month = :month AND day = :day');
$read_done_jobs_in_current_day->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month'],
    'day' => $_POST['day'],
]);
$done_jobs_in_current_day = $read_done_jobs_in_current_day->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($done_jobs_in_current_day));

?>