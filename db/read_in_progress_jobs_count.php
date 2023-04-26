<?php

include('../db/conn.php');

$read_in_progress_jobs_count = $db->prepare('SELECT * FROM in_progress_jobs_count');
$read_in_progress_jobs_count->execute([]);
$in_progress_jobs_count = $read_in_progress_jobs_count->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($in_progress_jobs_count));

?>