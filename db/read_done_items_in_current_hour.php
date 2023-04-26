<?php

include('../db/conn.php');

$read_done_items_in_current_hour = $db->prepare('SELECT * FROM instructions_per_hour WHERE year = :year AND month = :month AND day = :day AND hour = :hour');
$read_done_items_in_current_hour->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month'],
    'day' => $_POST['day'],
    'hour' => $_POST['hour'],
]);
$done_items_in_current_hour = $read_done_items_in_current_hour->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($done_items_in_current_hour));

?>