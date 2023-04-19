<?php
    include('./conn.php');

    $get_user = $db->prepare('SELECT id, role_id FROM user WHERE id = :user_id');
    $get_user->execute(['user_id' => $_POST['user_id']]);
    $user = $get_user->fetch(PDO::FETCH_ASSOC);

    exit(json_encode($user));
?>