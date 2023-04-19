<?php

include('./conn.php');

$read_colours = $db->prepare('SELECT * FROM colour ORDER BY name ASC');
$read_colours->execute([]);
$colours = $read_colours->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($colours));

?>