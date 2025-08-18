document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('project-detail-content');
    
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        contentDiv.innerHTML = '<h1>Project not found.</h1><p>Please go back to the portfolio and select a project.</p>';
        return;
    }

    fetch('js/projects.json')
        .then(response => response.json())
        .then(projects => {
            const project = projects.find(p => p.id === projectId);

            if (project) {
                // Set the page title to the project's title
                document.title = `${project.title} | Project Details`;
                
                contentDiv.innerHTML = `
                    <section class="project-hero" style="background-image: url('${project.hero_image}');">
                        <h1>${project.title}</h1>
                        <h2>${project.tagline}</h2>
                    </section>
                    <section class="project-info">
                        <div class="description">
                            <h3>About the Project</h3>
                            <p>${project.description}</p>
                        </div>
                        <div class="link-out">
                            <a href="${project.streamlit_url}" target="_blank" class="cta-button">
                                View Live App &rarr;
                            </a>
                        </div>
                    </section>
                `;
            } else {
                contentDiv.innerHTML = '<h1>Project not found.</h1>';
            }
        })
        .catch(error => {
            console.error('Error fetching project details:', error);
            contentDiv.innerHTML = '<h1>Error loading project.</h1>';
        });
});