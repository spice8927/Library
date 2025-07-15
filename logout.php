<?php
session_start();
session_unset();
session_destroy();

// Optional: Clear cache headers again
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

// Redirect to login
header("Location: login.html");
exit();
?>
