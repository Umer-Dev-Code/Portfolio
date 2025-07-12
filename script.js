document.addEventListener('DOMContentLoaded', function () {
  const mobileNavButton = document.getElementById('mobile-menu-button');
  const nav = mobileNavButton && mobileNavButton.nextElementSibling; // Assumes nav comes after button

  // Check if both elements exist before adding event listeners
  if (mobileNavButton && nav) {
    mobileNavButton.addEventListener('click', function () {
      const isExpanded = nav.classList.contains('active');
      nav.classList.toggle('active');
      mobileNavButton.setAttribute('aria-expanded', !isExpanded);

      // Toggle icon between bars (menu closed) and times (menu open)
      const icon = mobileNavButton.querySelector('i');
      if (isExpanded) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    });

    // Close nav when a navigation link is clicked (for single-page navigation)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileNavButton.setAttribute('aria-expanded', 'false');
        const icon = mobileNavButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ... rest of your code unchanged ...
  // (smooth scroll, active link, typing effect)
});