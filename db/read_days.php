<?php

include('../db/conn.php');

$read_days = $db->prepare('SELECT * FROM days WHERE year = :year AND month = :month');
$read_days->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month']
]);
$days = $read_days->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($days));
?>