<?php

    include('../db/conn.php');

    $user_id = $_POST['user_id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];

    $create_user = $db->prepare('UPDATE user SET username = :username, email = :email, firstname = :first_name, lastname = :last_name, time_updated = NOW() WHERE id =  :user_id');
    $create_user->execute([
        'user_id' => $user_id,
        'username' => $username,
        'email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name
    ]);

    exit(json_encode($_POST));
?>