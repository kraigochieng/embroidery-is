<?php

include('../db/conn.php');

$read_instructions_per_month = $db->prepare('SELECT * FROM instructions_per_month WHERE year = :year');
$read_instructions_per_month->execute(['year' => $_POST['year']]);
$instructions_per_month = $read_instructions_per_month->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($instructions_per_month));

?>