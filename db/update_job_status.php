<?php
include('./conn.php');

$job_ids = explode(',', $_POST["job_ids"]);

foreach($job_ids as $key => $job_id) {
    $update_job_status = $db->prepare('UPDATE job SET status = 2, confirmer_teller_id = :confirmer_teller_id, time_done = NOW() WHERE id = :job_id');
    $update_job_status->execute(['job_id' => $job_id, 'confirmer_teller_id' => $_POST['confirmer_teller_id']]);
}

?>