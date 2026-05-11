// === PARTICLES ===
function spawnParticles(container, count = 25) {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = -Math.random() * 100 + 'px';
        p.style.animationDuration = (12 + Math.random() * 18) + 's';
        p.style.animationDelay = -Math.random() * 20 + 's';
        p.style.opacity = (0.3 + Math.random() * 0.5).toString();
        container.appendChild(p);
    }
}
spawnParticles(document.getElementById('particles'), 45);
spawnParticles(document.getElementById('hero-particles'), 45);

// === PRELOADER ===
const preloader = document.getElementById('preloader');
const enterBtn = document.getElementById('enter-btn');
const audio = document.getElementById('bg-music');
const soundBtn = document.getElementById('sound-toggle');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

audio.volume = 0;

enterBtn.addEventListener('click', () => {
    // музыка с плавным fade-in
    audio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        let v = 0;
        const fade = setInterval(() => {
            v += 0.03;
            if (v >= 0.4) { v = 0.4; clearInterval(fade); }
            audio.volume = v;
        }, 80);
    }).catch(()=>{});

    preloader.classList.add('hidden');
    document.body.classList.remove('locked');
    soundBtn.classList.add('visible');

    // Запускаем word-reveal в hero с задержкой
    setTimeout(() => {
        document.querySelectorAll('.hero .word-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 220);
        });
    }, 600);
});

// === SOUND TOGGLE ===
soundBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audio.volume = 0.4;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    } else {
        audio.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    }
});

// === COUNTDOWN ===
const targetDate = new Date('2026-10-17T16:00:00+10:00').getTime();

function updateCountdown() {
    const diff = targetDate - Date.now();
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<div style="font-family:Pinyon Script,cursive;font-size:42px;color:var(--gold)">Сегодня наш день ✦</div>';
        return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-minutes').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-seconds').textContent = String(s).padStart(2,'0');
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
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// === HERO PARALLAX ===
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight && heroBg) {
        heroBg.style.transform = `translateY(${y * 0.4}px) scale(1.05)`;
    }
}, { passive: true });

// === RSVP заглушка ===
document.addEventListener('DOMContentLoaded', function() {
    const rsvpLink = document.getElementById('rsvp-link');
    const deadlineDate = new Date('2026-09-01T00:00:00+10'); // 1 сентября 2026, 00:00
    const currentDate = new Date();

    if (currentDate > deadlineDate) {
        rsvpLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Приём ответов на форму RSVP завершён 1 сентября 2026 года. Спасибо, что были с нами!');
        });

        rsvpLink.classList.add('btn-disabled');
        rsvpLink.style.pointerEvents = 'none';
        rsvpLink.style.opacity = '0.6';
    }
});
