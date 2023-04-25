<?php

include('../db/conn.php');

$read_instructions_per_day = $db->prepare('SELECT * FROM instructions_per_day WHERE year = :year AND month = :month');
$read_instructions_per_day->execute([
    'year' => $_POST['year'],
    'month' => $_POST['month']
]);
$instructions_per_day = $read_instructions_per_day->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($instructions_per_day));

?>