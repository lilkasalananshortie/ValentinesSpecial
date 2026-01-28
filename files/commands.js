const startBtn = document.getElementById('startBtn');
const rejectBtn = document.getElementById('rejectBtn');
let teleports = 0;

startBtn.addEventListener('click', () => {
    // 1. Smoothly center Page 2
    document.getElementById('page2').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });

    // 2. Trigger the Reveal (Fades in container and starts the H2 bounce)
    setTimeout(() => {
        document.getElementById('reveal-container').classList.add('visible');
        
        // 3. Staggered Pop-up for the images
        const imgs = document.querySelectorAll('.pop-up-img');
        imgs.forEach((img, i) => {
            setTimeout(() => img.classList.add('show'), i * 150);
        });
    }, 500); // Matches the scroll duration
});

// The Teleporting Reject Button
rejectBtn.addEventListener('click', () => {
    if (teleports < 100) {
        rejectBtn.style.position = 'fixed';
        const x = Math.random() * (window.innerWidth - rejectBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - rejectBtn.offsetHeight);
        rejectBtn.style.left = x + 'px';
        rejectBtn.style.top = y + 'px';
        teleports++;
    } else {
        rejectBtn.style.display = 'none';
    }
});