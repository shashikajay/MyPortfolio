<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = "shashikajayawardena2001@gmail.com";

    $email_subject = "Contact Form Submission: $subject";

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message";

    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";


    if (mail($to, $email_subject, $email_content, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Sorry, an error occurred while sending your message.";
    }
}
?>