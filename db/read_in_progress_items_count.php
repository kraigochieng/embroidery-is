<?php

include('../db/conn.php');

$read_in_progress_items_count = $db->prepare('SELECT * FROM in_progress_items_count');
$read_in_progress_items_count->execute([]);
$in_progress_items_count = $read_in_progress_items_count->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($in_progress_items_count));

?>