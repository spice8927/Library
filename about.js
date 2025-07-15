// main.js (or directly inside a <script> tag at the bottom)
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') && currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active-link');
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
