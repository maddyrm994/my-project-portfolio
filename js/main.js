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
                        <div class="project-card" style="background-image: url('${project.hero_image}')">
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
    
    // Select all the project cards you've just created
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Animate 'from' these values
        gsap.from(card, { 
            opacity: 0,
            y: 50, // Start 50px below its final position
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%", // Start animation when the top of the card is 90% from the top of the viewport
                toggleActions: "play none none none", // Play the animation once when it enters
            }
        });
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