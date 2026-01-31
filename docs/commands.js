const startBtn = document.getElementById('startBtn');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const resetBtn = document.getElementById('resetBtn');
const rainImages = [
    '/images/IMG_5219.jpeg',
    '/images/IMG_5220.jpeg',
    '/images/IMG_5221.jpeg',
    '/images/IMG_5222.jpeg',
    '/images/IMG_5223.jpeg',
    '/images/IMG_5224.jpeg',
    '/images/IMG_5225.jpeg',
    '/images/IMG_5226.jpeg',
    '/images/IMG_5227.jpeg'
];

const rainContainer = document.getElementById('rain-container');

// 1. SCROLL TO PAGE 2 & REVEAL SCRAPBOOK
startBtn.addEventListener('click', () => {
    document.getElementById('page2').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('reveal-container').classList.add('visible');
        document.querySelectorAll('.pop-up-img').forEach((img, i) => {
            setTimeout(() => img.classList.add('show'), i * 150);
        });
    }, 500);
});

// 2. ACCEPT BUTTON & SCATTERED RAIN
acceptBtn.addEventListener('click', () => {
    const page3 = document.getElementById('page3');
    page3.style.display = 'flex';
    page3.scrollIntoView({ behavior: 'smooth' });
    triggerRain();
});

// 3. REJECT BUTTON PRANK
rejectBtn.addEventListener('mouseover', () => {
    const parent = rejectBtn.parentElement;
    if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
    }
    rejectBtn.style.position = 'absolute';
    rejectBtn.style.left = Math.random() * 80 + 'vw';
    rejectBtn.style.top = Math.random() * 80 + 'vh';
});

// 4. SCATTERED RAIN LOGIC
function triggerRain() {
    // Clear old rain
    rainContainer.innerHTML = '';

    for (let i = 0; i < 60; i++) {
        const img = document.createElement('img');
        img.src = rainImages[Math.floor(Math.random() * rainImages.length)];
        img.classList.add('falling-img');

        // Random positions & animation
        const left = Math.random() * 95;
        const duration = Math.random() * 2 + 2.5;
        const delay = Math.random() * 4;
        const stopPos = Math.random() * 80 + 5;
        const rotation = Math.random() * 40 - 20;

        img.style.left = left + 'vw';
        img.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        img.style.transform = `rotate(${rotation}deg)`;

        // Store final position in data attribute for later animation
        img.dataset.stop = stopPos;

        rainContainer.appendChild(img);
    }

    // Remove previous keyframe if exists
    const existingStyle = document.getElementById('rain-animation');
    if (existingStyle) existingStyle.remove();

    // Single reusable keyframes
    const style = document.createElement('style');
    style.id = 'rain-animation';
    style.innerHTML = `
        @keyframes fall {
            0% { top: -200px; }
            100% { top: var(--stop); }
        }
    `;
    document.head.appendChild(style);

    // Apply stop position dynamically
    document.querySelectorAll('.falling-img').forEach(img => {
        img.style.setProperty('--stop', img.dataset.stop + 'vh');
    });
}

// 5. RESET BUTTON
resetBtn.addEventListener('click', () => {
    // Hide page 3
    const page3 = document.getElementById('page3');
    page3.style.display = 'none';

    // Reset scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide scrapbook
    const revealContainer = document.getElementById('reveal-container');
    revealContainer.classList.remove('visible');

    document.querySelectorAll('.pop-up-img').forEach(img => img.classList.remove('show'));

    // Clear and retrigger rain
    triggerRain();
});
