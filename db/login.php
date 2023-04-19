<?php 
    // Connect to database
    include('./conn.php');

    // Get Username
    $username = $_POST['username'];

    // Query for username together with their password
    $read_user = $db->prepare('SELECT id, username, password FROM user WHERE username = :username AND is_active = "Y"');
    

    // Add username to query
    $read_user->execute(['username' => $username]);
    
    // Make user an associative array
    $user = $read_user->fetch(PDO::FETCH_ASSOC);

    $response = array("status" => '0', "user_id" => '0');

    if($user === false || count($user) === 0) {
        $response['status'] = '1';
        exit(json_encode($response)); // Invalid Username
    }

    if(hash('sha512', $_POST['password']) === $user['password']) {
        $response['status'] = '3';
        $response['user_id'] = $user['id'];
        exit(json_encode($response)); // Valid Username And Password
    } else {
        $response['status'] = '2';
        exit(json_encode($response)); // Invalid Password
    }
    
    // exit(json_encode($user));
?>
