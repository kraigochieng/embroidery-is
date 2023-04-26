<?php

include('../db/conn.php');

$read_done_items_in_current_day = $db->prepare('SELECT * FROM instructions_per_day WHERE year = :year AND month = :month AND day = :day');
$read_done_items_in_current_day->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month'],
    'day' => $_POST['day'],
]);
$done_items_in_current_day = $read_done_items_in_current_day->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($done_items_in_current_day));

?>