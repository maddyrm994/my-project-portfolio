document.addEventListener('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('.main-content > section, .categories-container > section')];
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = 0;
    let isAnimating = false;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isAnimating) {
            isAnimating = true;
            currentSection = index;

            gsap.to(window, {
                scrollTo: { y: sections[index], autoKill: false },
                duration: 1,
                ease: 'power3.inOut',
                onComplete: () => {
                    isAnimating = false;
                    updateActiveNav();
                }
            });
        }
    }

    function updateActiveNav() {
        const currentSectionElement = sections[currentSection];
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionElement.id}`) {
                link.classList.add('active');
            }
        });
    }

    document.body.addEventListener('wheel', function(e) {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        scrollToSection(currentSection + direction);

    }, { passive: false });

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionIndex = link.getAttribute('href') === '#hero' ? 0 : index;
            scrollToSection(sectionIndex);
        });
    });

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

    gsap.registerPlugin(ScrollToPlugin);
    updateActiveNav();
});
