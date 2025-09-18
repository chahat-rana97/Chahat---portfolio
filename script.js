// ================================
// 🌗 Theme Toggle + Mobile Nav
// ================================
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Set footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
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
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
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
(function () {
  // Replace with your actual PUBLIC KEY
  emailjs.init("mqxmif26mRGbG3LBl");

  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
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
      modalDesc.innerHTML = desc;
      modalLink.href = link;

      // ✅ Always open in new tab
      modalLink.target = "_blank";
      modalLink.rel = "noopener noreferrer";

      modalImages.innerHTML = "";
      images.forEach(img => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${img.trim()}" alt="${title}" style="width:100%;border-radius:10px;">`;
        modalImages.appendChild(slide);
      });

      modal.style.display = "flex";

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

// ================================
// Certificate Modal Functionality
// ================================
document.addEventListener('DOMContentLoaded', function () {
  const certificateModal = document.getElementById('certificate-modal');
  const certificateCards = document.querySelectorAll('.certificate-card');
  const closeCertificateModal = document.querySelector('.certificate-modal-close');
  const closeCertificateModalBtn = document.querySelector('.certificate-modal-close-btn');

  const certificateData = {
    'vidyamine': {
      title: 'Certificate of Internship',
      issuer: 'Vidya Mine Pvt. Ltd.',
      date: 'August 2025',
      description: 'Successfully completed a 45-day internship program (25th June – 10th August 2025). Contributed to UI/UX development using Flutter and managed backend data with MySQL, improving the app’s functionality and design.',
      image: 'Vidyamine_certificate.png',
      download: 'Vidyamine_certificate (1).pdf'
    },
    'aspire': {
      title: 'Aspire Leaders Program',
      issuer: 'Aspire Institute',
      date: 'March 2025',
      description: 'Successfully completed all stages of the Aspire Leaders Program with leadership, communication, and critical thinking skills development.',
      image: 'Aspire leadership program.png',
      download: 'Aspire leadership program (1).pdf'
    },
    'softpro': {
      title: 'Python Programming Workshop',
      issuer: 'Softpro India, R.R. Institute of Modern Technology, Lucknow',
      date: 'February 2024',
      description: 'Participated in the workshop "A Journey from Beginner to Expert" on Python Programming.',
      image: 'Soft pro India.png',
      download: 'Soft pro India (1).pdf'
    },
    'hackerrank': {
      title: 'Problem Solving (Basic)',
      issuer: 'HackerRank',
      date: 'October 2024',
      description: 'Earned HackerRank certification in Problem Solving (Basic), demonstrating strong problem-solving and algorithmic thinking skills.',
      image: 'Probliem solving basics (java).png',
      download: 'Probliem solving basics (java).pdf'
    },
    'freecodecamp': {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: 'October 2024',
      description: 'Completed Responsive Web Design Developer Certification, representing approximately 300 hours of coursework in HTML, CSS, and responsive design.',
      image: 'Responsive-webdesign.png',
      download: 'Responsive-webdesign.pdf'
    },
    'webdev': {
      title: 'Full-Stack Web Development',
      issuer: 'Coursera',
      date: '2022',
      description: 'Advanced web development techniques including responsive design, APIs, and deployment strategies.',
      image: 'certificate-webdev.jpg',
      download: 'certificate-webdev.pdf'
    }
  };

  document.querySelectorAll('.certificate-card').forEach((card, index) => {
    const certificates = ['vidyamine','aspire', 'softpro', 'hackerrank', 'freecodecamp', 'webdev'];
    if (index < certificates.length) {
      card.setAttribute('data-certificate', certificates[index]);
    }
  });

  certificateCards.forEach(card => {
    card.addEventListener('click', function () {
      const certificateId = this.getAttribute('data-certificate');
      const data = certificateData[certificateId];

      if (data) {
        document.getElementById('certificate-modal-title').textContent = data.title;
        document.getElementById('certificate-modal-issuer').textContent = data.issuer;
        document.getElementById('certificate-modal-date').textContent = data.date;
        document.getElementById('certificate-modal-description').textContent = data.description;
        document.getElementById('certificate-modal-image').src = data.image;
        document.getElementById('certificate-modal-download').href = data.download;

        certificateModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    certificateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  closeCertificateModal.addEventListener('click', closeModal);
  closeCertificateModalBtn.addEventListener('click', closeModal);

  certificateModal.addEventListener('click', function (e) {
    if (e.target === certificateModal) {
      closeModal();
    }
  });
});

// ===== ENHANCED ANIMATIONS & TRANSITIONS =====
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section, idx) => {
    section.style.setProperty('--delay', `${idx * 0.15}s`);
    sectionObserver.observe(section);
  });

  const timelineObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        navToggle.innerHTML = '✕';
        navToggle.style.transform = 'rotate(180deg) scale(1.1)';
      } else {
        navToggle.innerHTML = '☰';
        navToggle.style.transform = 'rotate(0deg) scale(1)';
      }

      navToggle.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navToggle.innerHTML = '☰';
          navToggle.style.transform = 'rotate(0deg) scale(1)';
        }

        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Enhanced theme transition
(function () {
  const toggle = document.getElementById('theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.add('theme-changing');

      toggle.classList.add('pulse');
      setTimeout(() => toggle.classList.remove('pulse'), 600);

      setTimeout(() => {
        document.body.classList.remove('theme-changing');
      }, 600);
    });
  }
})();
