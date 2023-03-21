<?php

include('./conn.php');

$read_formats = $db->prepare('SELECT * FROM format');
$read_formats->execute([]);
$formats = $read_formats->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($formats));

?>