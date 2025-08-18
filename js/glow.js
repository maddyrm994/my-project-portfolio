document.addEventListener('mousemove', (e) => {
    const body = document.body;
    // e.clientX and e.clientY give us the mouse's coordinates
    // We update the CSS variables in real-time
    body.style.setProperty('--mouse-x', `${e.clientX}px`);
    body.style.setProperty('--mouse-y', `${e.clientY}px`);
});