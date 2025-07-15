<?php
session_start();

// Redirect to login if user is not logged in
if (!isset($_SESSION['user_name'])) {
    header('Location: login.html');
    exit();
}
?>