<?php
session_start();
require_once 'db.php'; // This should connect to your MySQL database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);

    if (empty($email)) {
        http_response_code(400);
        echo "Email is required.";
        exit;
    }

    // Check if user exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        http_response_code(404);
        echo "No account found with that email.";
        exit;
    }

    // Generate secure token and expiration
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Save token in database (create 'password_resets' table if not exists)
    $stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token=?, expires_at=?");
    $stmt->bind_param("sssss", $email, $token, $expires, $token, $expires);
    $stmt->execute();

    // Construct reset link
    $resetLink = "http://yourdomain.com/reset.html?token=$token&email=" . urlencode($email);

    // Send reset email
    $subject = "Reset your LASU CSC Library Password";
    $message = "Hello,\n\nWe received a request to reset your password.\nClick the link below to reset your password:\n$resetLink\n\nThis link will expire in 1 hour.\n\nIf you didn’t request a password reset, please ignore this email.";
    $headers = "From: noreply@yourdomain.com";

    if (mail($email, $subject, $message, $headers)) {
        echo "A password reset link has been sent to your email.";
    } else {
        http_response_code(500);
        echo "Failed to send reset email.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>
