<?php
    include('../db/conn.php');

    $read_user = $db->prepare('SELECT id, username, email, firstname, lastname, time_created, time_updated from user WHERE id = :id AND is_active = "Y"');
    $read_user->execute(['id' => $_POST['user_id']]);
    $user = $read_user->fetch(PDO::FETCH_ASSOC);

    exit(json_encode($user));
?>