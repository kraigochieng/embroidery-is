<?php 
    // Connect to database
    include('./conn.php');

    // Get Username
    $username = $_POST['username'];

    // Query for username together with their password
    $read_user = $db->prepare('SELECT id, username, password FROM user WHERE username = :username');
    
    // Add username to query
    $read_user->execute(['username' => $username]);
    
    // Make user an associative array
    $user = $read_user->fetchAll(PDO::FETCH_ASSOC);

    exit(json_encode($user));
?>
