// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hide');
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

hamburger.addEventListener('click', () => {
    sidebar.classList.add('open');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburger) {
        sidebar.classList.remove('open');
    }
});

// Smooth scrolling for navigation links
const expertiseSection = document.getElementById('expertise');
const expertiseTitle = expertiseSection ? expertiseSection.querySelector('.section-title') : null;
document.querySelectorAll('a[href="#expertise"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate offset for fixed header
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // Get the heading element and adjust scroll position to show it
            const expertiseHeading = target.querySelector('.section-title');
            let scrollPosition;
            
            if (expertiseHeading) {
                // Calculate position to show the heading below the fixed header
                const headingOffset = expertiseHeading.getBoundingClientRect().top + window.pageYOffset;
                scrollPosition = headingOffset - headerHeight - 20; // 20px extra padding for visibility
            } else {
                // Fallback if heading not found
                scrollPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
            }
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Highlight expertise title
            if (expertiseTitle) {
                expertiseTitle.classList.add('highlight-expertise');
                setTimeout(() => {
                    expertiseTitle.classList.remove('highlight-expertise');
                }, 1200);
            }
            // Close sidebar if open
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a, .sidebar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}); 