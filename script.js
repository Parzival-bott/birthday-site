document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     SLIDES
  ======================= */
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // Hide all except first
  slides.forEach((slide, index) => {
    if (index !== 0) slide.classList.add('hidden');
  });

  function showSlide(newIndex) {
    if (newIndex < 0 || newIndex >= slides.length) return;

    // stop video when leaving video slide
    if (currentSlide === 3 && loveVideo) {
      loveVideo.pause();
      loveVideo.currentTime = 0;
    }

    slides[currentSlide].classList.add('hidden');
    currentSlide = newIndex;
    slides[currentSlide].classList.remove('hidden');

    // typing only on slide 1
    if (currentSlide === 1) {
      startTyping();
    }

    // confetti only on FINAL slide (index 4)
    if (currentSlide === 4) {
      startConfetti();
    } else {
      stopConfetti();
    }
  }

  /* =======================
     NAVIGATION BUTTONS
  ======================= */
  document.getElementById('nextbtn')?.addEventListener('click', () => showSlide(1));
  document.getElementById('nextbtn2')?.addEventListener('click', () => showSlide(2));
  document.getElementById('nextbtn3')?.addEventListener('click', () => showSlide(3));
  document.getElementById('nextbtn4')?.addEventListener('click', () => showSlide(4));

  document.getElementById('prevbtn')?.addEventListener('click', () => showSlide(0));
  document.getElementById('prevbtn2')?.addEventListener('click', () => showSlide(1));
  document.getElementById('prevbtn3')?.addEventListener('click', () => showSlide(2));
  document.getElementById('prevbtn4')?.addEventListener('click', () => showSlide(3));

  /* =======================
     MUSIC
  ======================= */
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  if (bgMusic) bgMusic.volume = 0.4;

  musicBtn?.addEventListener('click', () => {
    if (!isPlaying) {
      bgMusic.play();
      musicBtn.textContent = '⏸ Pause Music';
      isPlaying = true;
    } else {
      bgMusic.pause();
      musicBtn.textContent = '▶ Play Music';
      isPlaying = false;
    }
  });

  /* =======================
     VIDEO
  ======================= */
  const loveVideo = document.getElementById('loveVideo');

  /* =======================
     TYPING EFFECT
  ======================= */
  const message =
    "Every moment with you feels magical. You make my world brighter every single day 💖";
  const typeText = document.getElementById('typeText');
  let charIndex = 0;
  let typingInterval = null;

  function startTyping() {
    if (!typeText) return;

    clearInterval(typingInterval);
    typeText.textContent = '';
    charIndex = 0;

    typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        typeText.textContent += message.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
  }

  /* =======================
     FLOATING HEARTS
  ======================= */
  const heartsContainer = document.getElementById('hearts');

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (14 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (4 + Math.random() * 3) + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }

  setInterval(createHeart, 800);

  /* =======================
     CONFETTI (FINAL SLIDE)
  ======================= */
  const confettiContainer = document.getElementById('confetti');
  let confettiInterval = null;

  function startConfetti() {
    if (confettiInterval) return;

    confettiInterval = setInterval(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');

      const colors = ['#ff6b6b', '#feca57', '#54a0ff', '#5f27cd'];
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = (3 + Math.random() * 3) + 's';

      confettiContainer.appendChild(confetti);

      setTimeout(() => confetti.remove(), 6000);
    }, 200);
  }

  function stopConfetti() {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }

});
