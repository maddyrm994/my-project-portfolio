document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing animation
    new Typed('#typing-text', {
        strings: ['AI & Data Science Enthusiast'],
        typeSpeed: 100,
        backSpeed: 25,
        loop: true
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

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('.hero-text > *', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // Content section animations
    document.querySelectorAll('.content-section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            }
        });
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            },
            onEnterBack: () => {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});
