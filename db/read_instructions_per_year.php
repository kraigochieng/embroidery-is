<?php

include('../db/conn.php');

$read_instructions_per_year = $db->prepare('SELECT * FROM instructions_per_year');
$read_instructions_per_year->execute([]);
$instructions_per_year = $read_instructions_per_year->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($instructions_per_year));

?>