<?php
header('Content-Type: application/json');

// Connect to DB
$host = "localhost";
$dbname = "lasu_library";
$username = "root"; // default for XAMPP
$password = "";     // leave empty for XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $e->getMessage()]);
    exit;
}

// Get form values
$fullName = $_POST['fullName'] ?? '';
$email = $_POST['email'] ?? '';
$pass = $_POST['password'] ?? '';

// Basic validation
if (empty($fullName) || empty($email) || empty($pass)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit;
}

// Check if email exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "User already exists."]);
    exit;
}

// Hash password and insert
$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
$stmt->execute([$fullName, $email, $hashedPassword]);

echo json_encode(["success" => true]);
