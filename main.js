document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-container input');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query.length === 0) {
        alert("Please enter a search term.");
        return;
      }

      // ✅ This redirects to a results page with the query in the URL
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    });

    // Allow Enter key to trigger search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }



  // Fix image paths if needed
  const images = document.querySelectorAll('img');
  images.forEach(image => {
    const oldSrc = image.getAttribute('src');
    if (oldSrc && oldSrc.includes("C:\\Users\\")) {
      image.src = oldSrc.replace(/^.*\\/, '');
    }
  });
});
