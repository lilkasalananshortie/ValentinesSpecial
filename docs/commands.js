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
    rejectBtn.style.position = 'absolute';
    rejectBtn.style.left = Math.random() * 80 + 'vw';
    rejectBtn.style.top = Math.random() * 80 + 'vh';
});

// 4. THE SCATTERED RAIN LOGIC
function triggerRain() {
    const rainContainer = document.getElementById('rain-container');
    rainContainer.innerHTML = ''; 
    
    // Increased to 60 for a fuller effect with all your photos
    for (let i = 0; i < 60; i++) {
        const img = document.createElement('img');
        
        // Pick a random image from your list
        const randomSource = rainImages[Math.floor(Math.random() * rainImages.length)];
        img.src = randomSource;
        
        img.classList.add('falling-img');
        
        const leftPos = Math.random() * 95;
        const duration = Math.random() * 2 + 2.5;
        const delay = Math.random() * 4; // Spread out the start times
        const stopPos = Math.random() * 80 + 5; 
        const rotation = Math.random() * 40 - 20;

        img.style.left = leftPos + "vw";
        img.style.animation = `fall-${i} ${duration}s linear ${delay}s forwards`;

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall-${i} {
                0% { top: -200px; transform: rotate(0deg); }
                100% { top: ${stopPos}vh; transform: rotate(${rotation}deg); }
            }
        `;
        document.head.appendChild(style);
        rainContainer.appendChild(img);
    }
}

// Reset button listener
document.getElementById('resetBtn').addEventListener('click', triggerRain);