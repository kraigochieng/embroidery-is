<?php

include('../db/conn.php');

$read_email = $db->prepare('SELECT email FROM user WHERE email = :email AND is_active = "Y"');
$read_email->execute(['email' => $_POST['email']]);
$email = $read_email->fetchAll(PDO::FETCH_ASSOC);

exit(json_encode($email));

?>