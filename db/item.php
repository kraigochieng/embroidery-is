<?php

include('./conn.php');

$read_items = $db->prepare('SELECT * FROM item ORDER BY name ASC');
$read_items->execute([]);
$items = $read_items->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($items));
?>