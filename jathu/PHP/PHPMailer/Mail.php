<?php
require 'PHPMailerAutoload.php';
require 'credential.php';

class Mail
{
    private $mail;
    public function __construct(string $to, string $subject, string $body)
    {
        $mail = new PHPMailer;
        $mail->SMTPDebug = 4;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = EMAIL;
        $mail->Password = PASS;
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->setFrom(EMAIL, 'Hospital Management');
        $mail->isHTML(false);
    }
}

$mail->SMTPDebug = 4;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = EMAIL;                 // SMTP username
$mail->Password = PASS;                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom(EMAIL, 'Hospital Management');
$mail->addAddress('jathavan.19@cse.mrt.ac.lk', 'Jathavan');     // Add a recipient
// $mail->addAddress('ellen@example.com');               // Name is optional
// $mail->addReplyTo(EMAIL);
// $mail->addCC('jathavanm.19@cse.mrt.ac.lk');
// $mail->addBCC('bcc@example.com');

// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(false);                                  // Set email format to HTML

$mail->Subject = 'Facility Notification';
$mail->Body    = 'Requird facilty details: ';
$mail->AltBody = 'Requird facilty details: ';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}