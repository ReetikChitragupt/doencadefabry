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
}); document.addEventListener('DOMContentLoaded', () => {
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

document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.getElementById("mobileNav").classList.add("active");
  document.querySelector(".menu-toggle").style.display = "none";
});

document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("mobileNav").classList.remove("active");
  document.querySelector(".menu-toggle").style.display = "block";
});

document.querySelectorAll(".has-dropdown > a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle("open");
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }

  // Change nav color when reaching Fabry section
  const fabrySection = document.getElementById("fabry");
  const nav = document.querySelector("nav"); // adjust if your nav selector differs
  const fabryTop = fabrySection.offsetTop - 50;

  if (window.scrollY >= fabryTop) {
    nav.classList.add("nav-red");
  } else {
    nav.classList.remove("nav-red");
  }
});

// Scroll back to top
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // trigger only once
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));
});

const toggleBtn = document.getElementById('toggleBtn');
const content = document.getElementById('collapsibleContent');
const arrow = document.getElementById('arrow-btn');

toggleBtn.addEventListener('click', () => {
  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  arrow.classList.toggle('rotate');
});


const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach(content => {
        content.style.display = content.id === target ? 'block' : 'none';
      });
    });
  });

  