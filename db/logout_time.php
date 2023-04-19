<?php

include('./conn.php');

$update_logout_time = $db->prepare('UPDATE user_log SET logout_time = :logout_time WHERE user_id = :user_id AND login_time = :login_time');
$update_logout_time->execute(['user_id' => $_POST['user_id'], 'login_time' => $_POST['login_time'], 'logout_time' => $_POST['logout_time']]);

?>