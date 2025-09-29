
function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button');

    buttons.forEach(button => {
        const span = button.querySelector('span');

        button.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY } = e;
            const { clientWidth, clientHeight } = button;

            const xPos = (offsetX / clientWidth) - 0.5;
            const yPos = (offsetY / clientHeight) - 0.5;

            gsap.to(button, {
                x: xPos * 40,
                y: yPos * 40,
                duration: 0.8,
                ease: 'power3.out'
            });

            if (span) {
                gsap.to(span, {
                    x: xPos * 20,
                    y: yPos * 20,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });

            if (span) {
                gsap.to(span, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    });
}

// Run the setup function when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // A small delay to ensure the button is in the DOM
    setTimeout(setupMagneticButtons, 500);
});
