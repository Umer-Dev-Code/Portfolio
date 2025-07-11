document.addEventListener('DOMContentLoaded', function () {
  const mobileNavButton = document.getElementById('mobile-menu-button');
  const primaryNavigation = document.getElementById('primary-navigation');

  // Check if both elements exist before adding event listeners
  if (mobileNavButton && primaryNavigation) {
    mobileNavButton.addEventListener('click', function () {
      // Toggle the 'active' class on the navigation to show/hide it
      const isExpanded = primaryNavigation.classList.contains('active');
      primaryNavigation.classList.toggle('active');
      // Update aria-expanded for accessibility
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
    primaryNavigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNavigation.classList.remove('active'); // Hide the navigation
        mobileNavButton.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
        // Reset icon to bars
        const icon = mobileNavButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to the target element with a smooth animation
        // Offset by 80px to account for the fixed header
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Update active link in navigation
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active-link'); // Remove active from all links
        });
        this.classList.add('active-link'); // Add active to the clicked link
      }
    });
  });

  // Highlight active section in navigation based on scroll position
  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY + 100; // Add offset for fixed header

    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      // Check if current scroll position is within the section
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active-link'); // Remove active from all links
          // Add active class to the link corresponding to the current section
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  });

  // Initialize active link on page load
  // Checks if there's a hash in the URL (e.g., #about)
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
    if (activeLink) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-link');
      });
      activeLink.classList.add('active-link');
    }
  } else {
    // If no hash, default to 'Home' as active
    document.querySelector('nav a[href="#home"]').classList.add('active-link');
  }

  // Typing text animation for the hero section
  const textElement = document.querySelector('.animated-text');
  const words = ["Web Developer", "Software Engineer", "UI/UX Designer", "Freelancer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    // Determine text to display: either typing or deleting
    const displayText = isDeleting
      ? currentWord.substring(0, charIndex - 1)
      : currentWord.substring(0, charIndex + 1);

    textElement.textContent = displayText;

    // Typing logic
    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 100); // Speed of typing
    }
    // Deleting logic
    else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 50); // Speed of deleting
    }
    // Switch between typing and deleting, and move to next word
    else {
      isDeleting = !isDeleting;
      wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
      setTimeout(type, 1000); // Pause before next action
    }
  }
  type(); // Start the typing animation when the page loads
});