<?php

include('../db/conn.php');

$read_username = $db->prepare('SELECT username FROM user WHERE username = :username AND is_active = "Y"');
$read_username->execute(['username' => $_POST['username']]);
$username = $read_username->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($username));

?>