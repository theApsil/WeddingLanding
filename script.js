const targetDate = new Date('2026-10-17T16:00:00+10:00').getTime(); // Владивосток UTC+10

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<div style="font-family:Cormorant Garamond,serif;font-size:28px;color:var(--gold)">Сегодня наш день ✦</div>';
        return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// === SCROLL REVEAL ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .fade-in').forEach(el => observer.observe(el));

// === HERO PARALLAX ===
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight && heroBg) {
        heroBg.style.transform = `translateY(${y * 0.4}px) scale(1.05)`;
    }
}, { passive: true });

const audio = document.getElementById('bg-music');
const btn = document.getElementById('sound-toggle');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
audio.volume = 0.4;

btn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        }).catch(err => console.warn('Не удалось запустить музыку:', err));
    } else {
        audio.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    }
});

const tryAutoPlay = () => {
    audio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    }).catch(()=>{});
    document.removeEventListener('click', tryAutoPlay);
    document.removeEventListener('scroll', tryAutoPlay);
};
document.addEventListener('click', tryAutoPlay, { once: true });
document.addEventListener('scroll', tryAutoPlay, { once: true });

// === RSVP заглушка ===
document.getElementById('rsvp-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Ссылка на форму подтверждения скоро появится здесь :)');
});