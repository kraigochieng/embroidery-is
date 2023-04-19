<?php
    include('./conn.php');

    $telephone_number = $_POST['telephone_number'];
    $receiver_teller_id = $_POST['receiver_teller_id'];
    $confirmer_teller_id = $_POST['confirmer_teller_id'];
    $job_number = $_POST['job_number'];
    $time_created = $_POST['time_created'];
    $time_done = $_POST['time_done'];
    $description = $_POST['description'];

    $create_job = $db->prepare('INSERT INTO
                                    job(telephone_number,
                                        receiver_teller_id,
                                        confirmer_teller_id,
                                        job_number,
                                        time_created,
                                        time_done,
                                        description,
                                        status)
                                VALUES (:telephone_number,
                                        :receiver_teller_id,
                                        :confirmer_teller_id, 
                                        :job_number,
                                        :time_created,
                                        :time_done,
                                        :description,
                                        2)');

    $create_job->execute([
        'telephone_number' => $telephone_number,
        'receiver_teller_id' => $receiver_teller_id,
        'confirmer_teller_id' => $confirmer_teller_id,
        'job_number' => $job_number,
        'time_created' => $time_created,
        'time_done' => $time_done,
        'description' => $description,
    ]);


    exit(json_encode($_POST));
 
?>