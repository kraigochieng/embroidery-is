<?php

include('../db/conn.php');

$read_instructions_per_hour = $db->prepare('SELECT * FROM instructions_per_hour WHERE year = :year AND month = :month AND day =:day');

$read_instructions_per_hour->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month'],
    'day' => $_POST['day']
]);

$instructions_per_hour = $read_instructions_per_hour->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($instructions_per_hour));

?>