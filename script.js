document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 1. Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default scroll behavior

        const targetId = this.getAttribute('href'); // Get the target section's ID
        const targetElement = document.querySelector(targetId); // Find the target element

        if (targetElement) {
            targetElement.scrollIntoView({ // Scroll smoothly to the target
                behavior: 'smooth'
            });
        }
    });
});

// 2. Highlight Active Navigation Link on Scroll<script>
  document.addEventListener('DOMContentLoaded', function() {
    const mobileNavButton = document.getElementById('mobile-menu-button');
    const primaryNavigation = document.getElementById('primary-navigation'); // Target by ID

    if (mobileNavButton && primaryNavigation) {
      mobileNavButton.addEventListener('click', function() {
        const isExpanded = primaryNavigation.classList.contains('active');
        primaryNavigation.classList.toggle('active');
        mobileNavButton.setAttribute('aria-expanded', !isExpanded);
      });

      // Close nav when a link is clicked (for single-page navigation)
      primaryNavigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          primaryNavigation.classList.remove('active');
          mobileNavButton.setAttribute('aria-expanded', 'false');

          // Optional: Smooth scroll to section
          const targetId = link.getAttribute('href');
          if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              window.scrollTo({
                top: targetSection.offsetTop - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0), // Adjust for fixed header
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
  });
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section'); // Get all sections
    const navLinks = document.querySelectorAll('nav a'); // Get all nav links
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove 'active' class from all links
        if (link.getAttribute('href').slice(1) === currentSectionId) {
            link.classList.add('active'); // Add 'active' class to the current link
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink); // Listen for scroll events

// 3. Reveal Elements on Scroll (Optional - for more dynamic effects)
function revealElements() {
    const elementsToReveal = document.querySelectorAll('.reveal'); // Add a class 'reveal' to elements you want to animate
    
    elementsToReveal.forEach(element => {
        const elementTop = element.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (elementTop < window.scrollY + windowHeight - 100) {
            element.classList.add('active'); // Add 'active' class to trigger animation
        } else {
            element.classList.remove('active'); // Remove 'active' class if not in view
        }
    });
}

// window.addEventListener('scroll', revealElements); //listen to scroll

// 4. Mobile Menu Toggle (Optional - if you have a mobile menu)
const mobileMenuButton = document.getElementById('mobile-menu-button'); //  ID for your mobile menu button
const navMenu = document.querySelector('nav ul'); //  querySelector for your nav menu

if (mobileMenuButton && navMenu) { // Check if elements exist
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggle a class to show/hide the menu
    });
}
