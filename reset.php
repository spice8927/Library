<?php
session_start();
require 'db.php'; // contains your database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm'] ?? '';

    if (empty($token) || empty($password) || empty($confirm)) {
        exit('All fields are required.');
    }

    if ($password !== $confirm) {
        exit('Passwords do not match.');
    }

    // Find user by token
    $stmt = $conn->prepare("SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Update the password and clear the token
        $update = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?");
        $update->bind_param("si", $hashedPassword, $user['id']);
        $update->execute();

        echo "Password reset successful. <a href='login.html'>Login here</a>";
    } else {
        echo "Invalid or expired token.";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
