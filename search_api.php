<?php
require_once 'includes/database.php';

$searchTerm = isset($_GET['q']) ? $_GET['q'] : '';

if (!empty($searchTerm)) {
    $searchResults = searchBooks($conn, $searchTerm); 

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($searchResults);
} else {
    // Return an empty array if no search term is provided
    echo json_encode([]); 
}

// Search function in includes/database.php
function searchBooks($conn, $searchTerm) {
    $sql = "SELECT * FROM books WHERE title LIKE '%" . $conn->real_escape_string($searchTerm) . "%' 
            OR author LIKE '%" . $conn->real_escape_string($searchTerm) . "%'"; 
    $result = $conn->query($sql);
    $searchResults = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $searchResults[] = $row;
        }
    }
    return $searchResults;
}
?>