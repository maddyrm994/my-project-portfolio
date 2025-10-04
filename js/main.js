document.addEventListener('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('.main-content > section, .categories-container > section')];

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
                }
            });
        }
    }

    // Scroll hijacking logic
    document.body.addEventListener('wheel', function(e) {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        scrollToSection(currentSection + direction);

    }, { passive: false });

    // Load projects
    const projectSwiperWrapper = document.getElementById('project-swiper-wrapper');
    if (projectSwiperWrapper) {
    fetch('js/projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                // --- THIS IS THE KEY CHANGE ---
                // Set the background image of the slide itself
                swiperSlide.style.backgroundImage = `url('${project.hero_image}')`;

                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                // We no longer need the tagline or tags in the HTML if the image does the talking
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <a href="${project.streamlit_url}" target="_blank" class="cta-button">View Project</a>
                `;

                swiperSlide.appendChild(projectCard);
                projectSwiperWrapper.appendChild(swiperSlide);
            });

                // Initialize Swiper
                const swiper = new Swiper('.swiper', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: true,
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            });
    }

    // Initial setup
    // Make sure to include the GSAP ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);
});
