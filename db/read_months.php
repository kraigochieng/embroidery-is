<?php

include('../db/conn.php');

$read_months = $db->prepare('SELECT * FROM months WHERE year = :year');
$read_months->execute(['year' => $_POST['year']]);
$months = $read_months->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($months));

?>