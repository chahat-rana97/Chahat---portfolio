// ================================
// 🌗 Theme Toggle + Mobile Nav
// ================================
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Set footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function applyTheme(theme){
    if(theme === 'dark') {
      root.setAttribute('data-theme','dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    if (toggle) toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  const saved = localStorage.getItem('theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  if (toggle) {
    toggle.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', ()=>{
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'var(--bg)';
        navLinks.style.position = 'absolute';
        navLinks.style.right = '20px';
        navLinks.style.top = '64px';
        navLinks.style.padding = '12px';
        navLinks.style.borderRadius = '10px';
        navLinks.style.boxShadow = 'var(--shadow)';
      }
    });
  }
})();

// ================================
// 📩 EmailJS Contact Form
// ================================
(function(){
  // Replace with your actual PUBLIC KEY
  emailjs.init("mqxmif26mRGbG3LBl");

  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      emailjs.sendForm("service_fl0edsi", "template_rny6ceg", this)
        .then(() => {
          if (statusMsg) {
            statusMsg.textContent = "✅ Message sent successfully!";
            statusMsg.style.color = "green";
          }
          form.reset();
        }, (error) => {
          if (statusMsg) {
            statusMsg.textContent = "❌ Failed to send. Try again!";
            statusMsg.style.color = "red";
          }
          console.error("EmailJS Error:", error);
        });
    });
  }
})();

// Modal elements
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalLink = document.getElementById("modal-link");

// Example data for projects (you can expand this)
const projectData = {
  "Unit Converter": {
    title: "Unit Converter",
    description: "A responsive unit converter web app built with HTML, CSS, and JS.",
    image: "newuc1.png",
    link: "project.html"
  },
  "Portfolio UI": {
    title: "Portfolio UI",
    description: "A modern portfolio UI with animations and smooth transitions.",
    image: "Screenshot 2025-04-02 003746.png",
    link: "project.html"
  },
  "Git & Collaboration": {
    title: "Git & Collaboration",
    description: "Demonstrates Git workflows, commits, and team collaboration.",
    image: "git2.png",
    link: "project.html"
  }
};

// Attach event to project cards
document.querySelectorAll(".projects-grid .card").forEach(card => {
  card.addEventListener("click", () => {
    const projectName = card.querySelector("h3").innerText;
    const data = projectData[projectName];

    // Fill modal with project data
    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalDescription.textContent = data.description;
    modalLink.href = data.link;

    // Show modal
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

// Close when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});
// ================================
// 🖼️ Swiper Carousel Init
// ================================
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".projects-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});


// ================================
// Project Modal with Swiper
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const closeBtn = modal.querySelector(".close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const modalLink = document.getElementById("modal-link");
  const modalImages = document.getElementById("modal-images");
  let swiperInstance;

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.dataset.title;
      const desc = card.dataset.description;
      const link = card.dataset.link;
      const images = card.dataset.images.split(",");

      modalTitle.textContent = title;
      modalDesc.innerHTML = desc;   // ✅ allow HTML & emojis
      modalLink.href = link;

      // Reset images
      modalImages.innerHTML = "";
      images.forEach(img => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${img.trim()}" alt="${title}" style="width:100%;border-radius:10px;">`;
        modalImages.appendChild(slide);
      });

      modal.style.display = "flex";

      // Init / Reinit swiper
      if (swiperInstance) swiperInstance.destroy(true, true);
      swiperInstance = new Swiper(".modal-swiper", {
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
      });
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
});
