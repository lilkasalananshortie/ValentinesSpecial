const startBtn = document.getElementById('startBtn');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const resetBtn = document.getElementById('resetBtn');

const rainImages = [
    'images/IMG_5219.jpeg',
    'images/IMG_5220.jpeg',
    'images/IMG_5221.jpeg',
    'images/IMG_5222.jpeg',
    'images/IMG_5223.jpeg',
    'images/IMG_5224.jpeg',
    'images/IMG_5225.jpeg',
    'images/IMG_5226.jpeg',
    'images/IMG_5227.jpeg'
];

const rainContainer = document.getElementById('rain-container');

// --- START BUTTON: reveal scrapbook + title + tilt images
startBtn.addEventListener('click', () => {
    const page2 = document.getElementById('page2');
    page2.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        const revealContainer = document.getElementById('reveal-container');
        revealContainer.classList.add('visible');

        // Scrapbook title animation
        const title = revealContainer.querySelector('h2');
        title.classList.add('show');

        // Pop-up images with tilt
        const rotations = [-10, 10, -5, 5, -15, 15]; 
        const popImages = revealContainer.querySelectorAll('.pop-up-img');
        popImages.forEach((img, i) => {
            img.style.setProperty('--rotation', rotations[i % rotations.length] + 'deg');
            setTimeout(() => img.classList.add('show'), i * 150);
        });
    }, 500);
});

// --- ACCEPT BUTTON: show rain
acceptBtn.addEventListener('click', () => {
    const page3 = document.getElementById('page3');
    page3.style.display = 'flex';
    page3.scrollIntoView({ behavior: 'smooth' });
    triggerRain();
});

// --- REJECT BUTTON prank
rejectBtn.addEventListener('mouseover', () => {
    const parent = rejectBtn.parentElement;
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
    rejectBtn.style.position = 'absolute';
    rejectBtn.style.left = Math.random() * 80 + 'vw';
    rejectBtn.style.top = Math.random() * 80 + 'vh';
});

// --- RAIN FUNCTION
function triggerRain() {
    rainContainer.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const img = document.createElement('img');
        img.src = rainImages[Math.floor(Math.random() * rainImages.length)];
        img.classList.add('falling-img');

        const left = Math.random() * 95;
        const duration = Math.random() * 2 + 2.5;
        const delay = Math.random() * 4;
        const stopPos = Math.random() * 80 + 5;
        const rotation = Math.random() * 40 - 20;

        img.style.left = left + 'vw';
        img.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        img.style.transform = `rotate(${rotation}deg)`;
        img.dataset.stop = stopPos;

        rainContainer.appendChild(img);
    }

    const existingStyle = document.getElementById('rain-animation');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'rain-animation';
    style.innerHTML = `
        @keyframes fall {
            0% { top: -200px; }
            100% { top: var(--stop); }
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.falling-img').forEach(img => {
        img.style.setProperty('--stop', img.dataset.stop + 'vh');
    });
}

// --- RESET BUTTON
resetBtn.addEventListener('click', () => {
    const page3 = document.getElementById('page3');
    page3.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const revealContainer = document.getElementById('reveal-container');
    revealContainer.classList.remove('visible');

    const title = revealContainer.querySelector('h2');
    title.classList.remove('show');

    document.querySelectorAll('.pop-up-img').forEach(img => img.classList.remove('show'));

    triggerRain();
});
