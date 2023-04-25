<?php
include('../db/conn.php');

$read_jobs_per_month = $db->prepare("SELECT * FROM jobs_per_month WHERE year = :year ORDER BY month");
$read_jobs_per_month->execute(['year' => $_POST['year']]);
$jobs_per_month = $read_jobs_per_month->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($jobs_per_month));

?>