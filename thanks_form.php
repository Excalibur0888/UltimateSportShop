<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $subject = $_POST["subject"] ?? '';
    $message = $_POST["message"] ?? '';
    
    $to = "contact@" . $_SERVER['HTTP_HOST'];
    $email_subject = "New message from contact form";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message: $message\n";
    
    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";
    
    mail($to, $email_subject, $body, $headers);
    
    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
