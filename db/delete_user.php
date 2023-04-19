<?php

include('../db/conn.php');

$delete_user = $db->prepare('UPDATE user SET is_active = "N" WHERE id = :user_id');
$delete_user->execute(['user_id' => $_POST['user_id']]);

exit('1');
?>