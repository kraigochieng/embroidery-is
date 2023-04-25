<?php
include('../db/conn.php');

$read_jobs_per_day = $db->prepare("SELECT * FROM jobs_per_day WHERE year = :year AND month = :month");
$read_jobs_per_day->execute(['year' => $_POST['year'], 'month' => $_POST['month']]);
$jobs_per_day = $read_jobs_per_day->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($jobs_per_day));

?>