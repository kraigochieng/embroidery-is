<?php

include('../db/conn.php');

$read_years = $db->prepare('SELECT * FROM years ORDER BY year ASC');
$read_years->execute([]);
$years = $read_years->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($years));

?>