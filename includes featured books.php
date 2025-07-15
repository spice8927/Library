<?php
require_once 'database.php';

$featuredBooks = getFeaturedBooks($conn); 

if (!empty($featuredBooks)) {
    foreach ($featuredBooks as $book) {
        echo '<div class="category-card1">';
        echo '<a href="book_details.php?id=' . $book['id'] . '">';
        echo '<img src="' . $book['image'] . '" alt="' . $book['title'] . '">';
        echo '</a>';
        echo '</div>';
    }
} else {
    echo '<p>No featured books found.</p>';
}
?>