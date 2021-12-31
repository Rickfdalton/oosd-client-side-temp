<?php
require_once './Database.php';
require_once '../PHPMailer/credential.php';

$db = new Database(HOST, USER, DB_PASS, DB);
$email = $_POST['email'];
$fac = $_POST['fac'];
$hos = ucwords(strtolower($_POST['hos']));
$db->saveUsermail($email, $fac, $hos);


?>