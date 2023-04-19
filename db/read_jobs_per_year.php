<?php

include('./conn.php');

$read_jobs_per_year = $db->prepare('SELECT * FROM jobs_per_year ORDER BY year ASC');
$read_jobs_per_year->execute([]);
$jobs_per_year = $read_jobs_per_year->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($jobs_per_year));

?>