<<<<<<< HEAD
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
        strings: ['I build simple dashboards, applications & tools using Artificial Intelligence & Data Science'],
        typeSpeed: 50,
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
});
=======
document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('project-grid');

    // Check if the project grid exists on the page
    if (projectGrid) {
        fetch('js/projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(projects => {
                projects.forEach(project => {
                    const projectLink = document.createElement('a');
                    projectLink.href = `project.html?id=${project.id}`;
                    projectLink.classList.add('project-card-link');
                    
                    projectLink.innerHTML = `
                        <div class="project-card">
                            <div class="card-content">
                                <h3>${project.title}</h3>
                                <p>${project.tagline}</p>
                            </div>
                        </div>
                    `;
                    projectGrid.appendChild(projectLink);
                });
                
                // Once all cards are added to the DOM, initialize the animations
                setupAnimations();
                addRippleEffectListeners();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                projectGrid.innerHTML = `<p style="color: red;">Could not load projects. Make sure you're running this on a local server.</p>`;
            });
    }
});

function setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate from these values
    gsap.from(".project-card", { 
        opacity: 0,
        y: 30, // Start 30px below its final position
        rotationX: -10, // A little bit of 3D rotation
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1, // Add a small delay between each card
        scrollTrigger: {
            trigger: ".project-grid-container",
            start: "top 80%", // Start a bit earlier
            toggleActions: "play none none none",
        }
    });
}

function addRippleEffectListeners() {
    const projectLinks = document.querySelectorAll('.project-card-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Prevent the default navigation
            e.preventDefault();

            // Store the destination URL
            const destination = this.href;

            // Get the card element itself
            const card = this.querySelector('.project-card');

            // 2. Create the ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Calculate the ripple's final size to ensure it covers the card
            const diameter = Math.max(card.clientWidth, card.clientHeight);
            const radius = diameter / 2;
            
            ripple.style.width = ripple.style.height = `${diameter}px`;

            // 3. Position the ripple at the click location
            const rect = card.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - radius}px`;
            ripple.style.top = `${e.clientY - rect.top - radius}px`;

            // Add the ripple to the card
            card.appendChild(ripple);
            
            // 4. Trigger the animation by adding the 'active' class
            // We use a tiny timeout to ensure the browser has rendered the ripple
            // before trying to animate it.
            requestAnimationFrame(() => {
                ripple.classList.add('active');
            });


            // 5. Navigate to the page after the animation finishes
            setTimeout(() => {
                window.location.href = destination;
            }, 600); // This duration MUST match the CSS transition duration (0.6s)
        });
    });
}
>>>>>>> 892b3882ca9a0cea6325eda08157b969411e1254
