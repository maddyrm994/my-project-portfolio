document.addEventListener('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('.main-content > section, .categories-container > section')];

    let currentSection = 0;
    let isAnimating = false;

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
                        <br>
                        <a href="${project.streamlit_url}" target="_blank" class="cta-button">View Live App</a>
                    `;
                    projectGrid.appendChild(projectCard);
                });
            });
    }

    // Initial setup
    // Make sure to include the GSAP ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);
});
