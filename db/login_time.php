<?php

include('./conn.php');

$create_user_log = $db->prepare('INSERT INTO user_log(user_id, login_time) VALUES (:user_id, :login_time)');
$create_user_log->execute(['user_id' => $_POST['user_id'], 'login_time' => $_POST['login_time']]);

$user_log = array("user_id" => $_POST['user_id'], "login_time" => $_POST['login_time']);

exit(json_encode($user_log));

?>