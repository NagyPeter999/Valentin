const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const music = document.getElementById("music");

// 1️⃣ Kezdőpozíció: NEM gomb az IGEN alatt
function positionNoButton() {
    const yesRect = yesBtn.getBoundingClientRect();

    // X: IGEN gomb középpontjához igazítva
    const x = yesRect.left + yesRect.width / 2 - noBtn.offsetWidth / 2;

    // Y: IGEN gomb alja + 15px távolság
    const y = yesRect.bottom + 15;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Biztos, hogy a DOM teljesen renderelve van
window.addEventListener("load", () => {
    requestAnimationFrame(positionNoButton);
});

let scale = 1;

// 2️⃣ NEM gomb ugrál a teljes viewporton hover-re
noBtn.addEventListener("mouseover", () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const yesRect = yesBtn.getBoundingClientRect();

    let x, y;
    let safe = false;

    while (!safe) {
        x = Math.random() * (screenWidth - noBtn.offsetWidth);
        y = Math.random() * (screenHeight - noBtn.offsetHeight);

        const distance = Math.hypot(x - yesRect.left, y - yesRect.top);
        if (distance > 150) safe = true;
    }

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // IGEN gomb növelése minden hover-nál
    scale += 0.1;
    yesBtn.style.transform = `scale(${scale})`;
});

// 3️⃣ IGEN gomb kattintás → második oldal
yesBtn.addEventListener("click", () => {
    document.querySelector(".first-page").classList.remove("active");
    document.querySelector(".second-page").classList.add("active");
    music.play();

    // TÉNYLEG?? gomb
    document.getElementById("reallyBtn").addEventListener("click", finalPage);
});

// 4️⃣ Végső oldal + konfetti
function finalPage() {
    document.querySelector(".second-page").classList.remove("active");
    document.querySelector(".final-page").classList.add("active");

    setInterval(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            shapes: ['heart'],
            colors: ['#ff4d88', '#ffb6c1', '#fff']
        });
    }, 500);
}


