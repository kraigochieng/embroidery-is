<?php

include('../db/conn.php');

$read_formats_per_instruction = $db->prepare('SELECT * FROM formats_per_instruction ORDER BY count DESC');
$read_formats_per_instruction->execute([]);
$formats_per_instruction = $read_formats_per_instruction->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($formats_per_instruction));

?>