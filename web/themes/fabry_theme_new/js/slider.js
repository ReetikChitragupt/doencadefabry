document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevBtn = document.querySelector('.hero-slider .arrow.prev');
  const nextBtn = document.querySelector('.hero-slider .arrow.next');
  const currentEl = document.querySelector('.hero-slider .slide-index .current');
  const totalEl = document.querySelector('.hero-slider .slide-index .total');

  if (!slides.length) return;

  let index = 0;

  // set totals
  totalEl.textContent = slides.length.toString().padStart(2, '0');

  function setActive(i, dir = 'right') {
    slides.forEach((s, n) => {
      s.classList.toggle('active', n === i);
      s.classList.remove('enter-left', 'enter-right');
      if (n === i) s.classList.add(dir === 'left' ? 'enter-left' : 'enter-right');
    });
    currentEl.textContent = (i + 1).toString().padStart(2, '0');
  }

  // arrow handlers
  if (prevBtn) prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    setActive(index, 'left');
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    setActive(index, 'right');
  });

  // autoplay
  setInterval(() => {
    index = (index + 1) % slides.length;
    setActive(index, 'right');
  }, 5000);

  setActive(index);
});document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevBtn = document.querySelector('.hero-slider .arrow.prev');
  const nextBtn = document.querySelector('.hero-slider .arrow.next');
  const currentEl = document.querySelector('.hero-slider .slide-index .current');
  const totalEl = document.querySelector('.hero-slider .slide-index .total');

  if (!slides.length) return;

  let index = 0;

  // set totals
  totalEl.textContent = slides.length.toString().padStart(2, '0');

  function setActive(i, dir = 'right') {
    slides.forEach((s, n) => {
      s.classList.toggle('active', n === i);
      s.classList.remove('enter-left', 'enter-right');
      if (n === i) s.classList.add(dir === 'left' ? 'enter-left' : 'enter-right');
    });
    currentEl.textContent = (i + 1).toString().padStart(2, '0');
  }

  // arrow handlers
  if (prevBtn) prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    setActive(index, 'left');
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    setActive(index, 'right');
  });

  // autoplay
  setInterval(() => {
    index = (index + 1) % slides.length;
    setActive(index, 'right');
  }, 5000);

  setActive(index);
});

document.querySelector(".menu-toggle").addEventListener("click", function() {
  document.getElementById("mobileNav").classList.add("active");
  document.querySelector(".menu-toggle").style.display = "none";
});

document.querySelector(".close-btn").addEventListener("click", function() {
  document.getElementById("mobileNav").classList.remove("active");
  document.querySelector(".menu-toggle").style.display = "block";
});

document.querySelectorAll(".has-dropdown > a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle("open");
  });
});