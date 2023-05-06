<?php
try {
    
    $host = "localhost";
    $dbname = "embroidery";
    $dsn = "mysql:host=$host;dbname=$dbname";

    $username = "root";
    $password = "";
    
    $db = new PDO($dsn, $username, $password);

} catch (Exception $e) {

    echo $e->getMessage();
}
?>
