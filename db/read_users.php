<?php
    include('../db/conn.php');

    $read_users = $db->prepare('SELECT id, username from user WHERE is_active = "Y" ORDER BY username ASC ');
    $read_users->execute([]);
    $users = $read_users->fetchAll(PDO::FETCH_ASSOC);

    exit(json_encode($users));
?>