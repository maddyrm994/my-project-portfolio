document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const categoriesContainer = document.querySelector('.categories-container');
    const navLinks = document.querySelectorAll('.nav-link');

    let isHomeVisible = true;
    let isAnimating = false;

    function showHome() {
        if (!isHomeVisible && !isAnimating) {
            isAnimating = true;
            gsap.to(categoriesContainer, { y: '100vh', duration: 1, ease: 'power3.inOut' });
            gsap.to(heroSection, { y: '0', duration: 1, ease: 'power3.inOut', onComplete: () => {
                isHomeVisible = true;
                isAnimating = false;
                updateActiveNav();
            } });
        }
    }

    function showCategories(scrollTo) {
        if (isHomeVisible && !isAnimating) {
            isAnimating = true;
            gsap.to(heroSection, { y: '-100vh', duration: 1, ease: 'power3.inOut' });
            gsap.to(categoriesContainer, { y: '0', duration: 1, ease: 'power3.inOut', onComplete: () => {
                isHomeVisible = false;
                isAnimating = false;
                updateActiveNav();
                if (scrollTo) {
                    document.querySelector(scrollTo).scrollIntoView({ behavior: 'smooth' });
                }
            } });
        }
    }

    function updateActiveNav() {
        navLinks.forEach(link => link.classList.remove('active'));
        if (isHomeVisible) {
            document.querySelector('.nav-link[href="#hero"]').classList.add('active');
        } else {
            // This part is tricky without scroll events in the container.
            // For now, let's activate the 'About' link as a default when categories are shown.
            document.querySelector('.nav-link[href="#about"]').classList.add('active');
        }
    }

    // Scroll hijacking logic
    document.body.addEventListener('wheel', function(e) {
        if (isAnimating) return;
        if (e.deltaY > 0 && isHomeVisible) {
            e.preventDefault();
            showCategories();
        } else if (e.deltaY < 0 && !isHomeVisible && categoriesContainer.scrollTop === 0) {
            e.preventDefault();
            showHome();
        }
    }, { passive: false });

    // Navigation click handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            if (targetId === '#hero') {
                showHome();
            } else {
                if (isHomeVisible) {
                    showCategories(targetId);
                } else {
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Load projects
    const projectGrid = document.getElementById('project-grid');
    if (projectGrid) {
        fetch('js/projects.json')
            .then(response => response.json())
            .then(projects => {
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');

                    const tags = project.tags.map(tag => `<span>${tag}</span>`).join('');

                    projectCard.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.tagline}</p>
                        <div class="tags">${tags}</div>
                        <a href="${project.streamlit_url}" target="_blank" class="cta-button">View Live App</a>
                    `;
                    projectGrid.appendChild(projectCard);
                });
            });
    }
});
