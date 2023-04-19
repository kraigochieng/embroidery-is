<?php

include('./conn.php');

$read_jobs_per_month = $db->prepare('SELECT * FROM jobs_per_month');
$read_jobs_per_month->execute([]);
$jobs_per_month = $read_jobs_per_month->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($jobs_per_month));

?>