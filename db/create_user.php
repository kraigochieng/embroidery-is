<?php

    include('../db/conn.php');

    $username = $_POST['username'];
    $email = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $password = hash('sha512', $_POST['username']);
    $role_id = 3;
    $create_user = $db->prepare('INSERT INTO user(username, email, firstname, lastname, password, role_id) VALUES(:username, :email, :first_name, :last_name, :password, :role_id)');
    $create_user->execute([
        'username' => $username,
        'email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'password' => $password,
        'role_id' => $role_id
    ]);

    exit(json_encode($_POST));
?>