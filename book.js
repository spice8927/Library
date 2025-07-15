// book.js

// Function to dynamically generate book list HTML
function generateBookList(level, data) {
    const bookListContainer = document.querySelector(`#${level} .book-list`);
    bookListContainer.innerHTML = ''; // Clear existing content
  
    data.forEach(book => {
      const bookItem = document.createElement('section class="100-level"');
      bookItem.classList.add('book-item'); 
  
      const bookTitle = document.createElement('h3');
      bookTitle.textContent = book.title;
  
      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = book.author;
  
      const bookLink = document.createElement('a');
      bookLink.href = book.link;
      bookLink.textContent = 'Download';
      bookLink.target = '_blank'; // Open link in a new tab
  
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookLink);
  
      bookListContainer.appendChild(bookItem);
    });
  }
  const detailsElements = document.querySelectorAll('details');

detailsElements.forEach((details, index) => {
  details.addEventListener('toggle', () => {
    // Close all other details elements 
    detailsElements.forEach((otherDetails, otherIndex) => {
      if (index !== otherIndex) {
        otherDetails.open = false; 
      }
    });
  });
});
  // Sample book data (replace with your actual data)
  const bookData = {
    "100": [
      { title: "PHY101", author: "Professor Olamilekan", link: "path/to/phy101.pdf" },
      { title: "GNS101", author: "Professor Olamilekan", link: "path/to/gns101.pdf" },
      { title: "MAT101", author: "Professor Olamilekan", link: "path/to/mat101.pdf" }
    ],
    "200": [
      // ... your 200-level book data
    ],
    "300": [
      // ... your 300-level book data
    ],
    "400": [
      // ... your 400-level book data
    ]
  };
  
  // Generate book lists for each level
  Object.keys(bookData).forEach(level => {
    generateBookList(level, bookData[level]);
  });