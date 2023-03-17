<?php

include('conn.php');

$item_id = $_POST['item_id'];
// Read Positions
$read_positions = $db->prepare('SELECT * FROM position WHERE item_id  = :item_id ORDER BY name ASC');
$read_positions->execute(['item_id' => $item_id]);
$positions = $read_positions->fetchAll(PDO::FETCH_ASSOC);


exit(json_encode($positions));
?>