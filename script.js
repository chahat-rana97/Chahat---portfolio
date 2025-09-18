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

// ===== PROJECT DETAIL MODAL WITH IMAGE CAROUSEL =====
document.addEventListener('DOMContentLoaded', function() {
  // Project details data - REORDERED as requested
  const projectDetails = {
    'chembalancer': {
      title: 'Chembalancer',
      description: `<p>🧪 <b>Chembalancer (Chemistry Equation App)</b><br><br>
        A <b>Flutter-based educational app</b> designed to help students <b>balance chemical equations</b> with ease. 
        The app processes equations directly on-device and provides <b>step-by-step explanations</b>, making it a practical learning companion for chemistry learners. 
        Built with <b>modern Flutter widgets and dependencies</b>, it ensures smooth performance and an intuitive user experience.<br><br>
        
        <b>🔑 Features:</b><br>
        • Equation Balancer: Instantly balances simple to complex chemical equations.<br>
        • Step-by-Step Solver: Displays balancing logic for clear understanding.<br>
        • Reaction Details: Includes type, conditions, and observations.<br>
        • Offline Functionality: No internet or backend required.<br>
        • Cross-Platform: Flutter ensures support for both Android and iOS.<br><br>
        
        <b>🛠️ Tech Stack:</b><br>
        • Framework: Flutter (Dart)<br>
        • Dependencies: <br>
        &nbsp;&nbsp;• <code>provider</code> – for state management<br>
        &nbsp;&nbsp;• <code>flutter_math_fork</code> for rendering chemical formulas and equations<br>
        &nbsp;&nbsp;• <code>equatable</code> – for cleaner model handling<br>
        &nbsp;&nbsp;• <code>shared_preferences</code> for local storage of saved equations<br><br>
        
        <b>🚀 Outcome:</b><br>
        Created a <b>lightweight, offline-ready chemistry app</b> that simplifies balancing equations and enhances learning through <b>interactive, dependency-powered Flutter features</b>.</p>`,
      images: ['ChemBalancer/Untitled design.jpg', 'ChemBalancer/5.jpg', 'ChemBalancer/4.jpg', 'ChemBalancer/2.jpg', 'ChemBalancer/3.jpg'],
      link: 'https://drive.google.com/file/d/1ZjvvqIHFOAAs86wakM_4eWyCO50_pcPD/view?usp=sharing'
    },
    'attendly': {
      title: 'Attendly',
      description: `<p>📲 <b>Attendly (Attendance App)</b><br><br>
        A robust <b>industry-focused attendance management system</b> developed using <b>Flutter, Node.js, and MySQL</b>. 
        The app enables employees to <b>check in and check out in real time</b>, with records securely stored in a <b>cloud-hosted backend on Render</b>. 
        It also provides detailed <b>attendance history and analytics</b>, ensuring accuracy, transparency, and ease of management.<br><br>
        
        <b>🔑 Features:</b><br>
        • Real-Time Attendance: Instant check-in/check-out with live sync.<br>
        • Attendance History: Complete access to past records for employees.<br>
        • Secure Data Storage: Reliable MySQL database with RESTful APIs.<br>
        • Cross-Platform Support: Built with Flutter for Android and iOS.<br>
        • Cloud Deployment: Backend hosted live on Render for scalability.<br>
        • Business-Ready: Designed to enhance workforce management efficiency.<br><br>
        
        <b>🛠️ Tech Stack:</b><br>
        • Frontend: Flutter (Dart)<br>
        • Backend: Node.js with Express.js<br>
        • Database: MySQL<br>
        • Hosting & Deployment: Render<br><br>
        
        <b>🚀 Outcome:</b><br>
        Delivered a <b>scalable and efficient attendance management solution</b> that empowers businesses with real-time employee tracking while providing employees with <b>transparency, reliability, and easy access</b> to their records.</p>`,
      images: ['attendance app/1.jpg', 'attendance app/2.jpg', 'attendance app/3.jpg', 'attendance app/4.jpg'],
      link: 'https://drive.google.com/file/d/1w1lhYq2jTrS8rIaayKW_MEW-SeYpJkyJ/view?usp=sharing'
    },
    'unit-converter': {
      title: 'Unit Converter',
      description: `<p>📱 <b>Unit Converter App</b><br><br>
        A <b>smart, cross-platform application</b> built with <b>Flutter</b>, seamlessly available on both <b>Web and Android</b>. 
        Designed to be fast, intuitive, and visually engaging, it supports <b>10+ categories</b> including Length, Area, Mass, 
        Volume, Temperature, Speed, Time, Energy, Angle, Frequency, Force, and Pressure — making conversions effortless in just seconds.<br><br>
        
        <b>🔑 Features:</b><br>
        • Wide Range of Categories: 10+ unit types supported for versatile conversions.<br>
        • Real-Time Conversion: Instant results with smooth calculations.<br>
        • Interactive Graph Mode: Visualize conversion trends in real time.<br>
        • Practice Mode: Quiz-style challenges to test and enhance learning.<br>
        • Sleek Modern UI: Clean, responsive, and user-friendly design across devices.<br><br>
        
        <b>🛠️ Tech Stack:</b><br>
        • Framework: Flutter<br>
        • Language: Dart<br>
        • Platforms: Web & Android<br>
        • Libraries: Custom logic, fl_chart<br><br>
        
        <b>🚀 Outcome:</b><br>
        This project highlights my skills in <b>Flutter development, responsive design, and creating apps</b> that are not only powerful but also <b>educational and enjoyable to use</b>.</p>`,
      images: ['unit converter/3.jpg', 'unit converter/2.jpg', 'unit converter/1.jpg'],
      link: 'https://play.google.com/store/apps/details?id=com.vidyamine.app'
    },
    'curve-plotter': {
      title: 'Curve Plotter',
      description: `<p>📊 <b>Curve Plotter</b><br><br>
        A <b>Flutter-based interactive mobile application</b> that allows users to <b>visualize polynomial functions up to degree 3</b> in real time. 
        Users can input coefficients for cubic, quadratic, linear, or constant functions, and the tool dynamically generates the corresponding curve on a graph.<br><br>
        
        <b>🔑 Features:</b><br>
        • Polynomial Visualization: Supports cubic, quadratic, linear, and constant functions.<br>
        • Real-Time Plotting: Instantly updates the graph based on user inputs.<br>
        • User-Friendly Interface: Intuitive coefficient input fields with a clean design.<br>
        • Interactive Graph: Zoom and reset options for better curve exploration.<br>
        • Educational Tool: Helps students and learners understand polynomial behavior through visualization.<br><br>
        
        <b>🛠️ Tech Stack:</b><br>
        • Framework: Flutter<br>
        • Language: Dart<br>
        • Graphing Library: fl_chart / syncfusion_flutter_charts<br><br>
        
        <b>🚀 Outcome:</b><br>
        This project simplifies the process of understanding and analyzing polynomial curves, making it a valuable tool for <b>students, educators, and math enthusiasts</b>.</p>`,
      images: ['Curve Ploter/1.jpg', 'Curve Ploter/2.jpg', 'Curve Ploter/3.jpg', 'Curve Ploter/4.jpg'],
      link: 'https://play.google.com/store/apps/details?id=com.vidyamine.app'
    }
  };

  // Add event listeners to detail buttons
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const project = projectDetails[projectId];
      
      if (project) {
        // Create or update modal with project details
        showProjectModal(project);
      }
    });
  });

  function showProjectModal(project) {
    // Check if modal already exists
    let modal = document.getElementById('project-details-modal');
    
    if (!modal) {
      // Create modal if it doesn't exist
      modal = document.createElement('div');
      modal.id = 'project-details-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      `;
      
      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
        background: var(--card);
        border-radius: 12px;
        padding: 24px;
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      `;
      
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 28px;
        cursor: pointer;
        color: var(--muted);
        z-index: 10;
      `;
      closeBtn.addEventListener('click', closeModal);
      
      modalContent.appendChild(closeBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      // Close modal when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    // Update modal content
    const modalContent = modal.querySelector('div');
    
    // Create image carousel HTML
    let carouselHTML = '';
    if (project.images && project.images.length > 0) {
      carouselHTML = `
        <div class="project-carousel" style="margin-bottom: 20px;">
          <div class="swiper project-modal-swiper" style="width: 100%;">
            <div class="swiper-wrapper">
              ${project.images.map(img => `
                <div class="swiper-slide">
                  <img src="${img}" alt="${project.title}" style="width: 100%; border-radius: 8px;">
                </div>
              `).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      `;
    }
    
    modalContent.innerHTML = `
      <span style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: var(--muted); z-index: 10;">&times;</span>
      <h2 style="color: #6d28d9; margin-top: 0; margin-bottom: 15px;">${project.title}</h2>
      ${carouselHTML}
      <div style="margin-bottom: 20px;">${project.description}</div>
      <div style="margin-top: 20px;">
        <a href="${project.link}" target="_blank" class="project-btn view-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 6px; font-weight: 600; text-decoration: none; background: #6d28d9; color: white;">
          <i class="fas fa-external-link-alt"></i> Download APK
        </a>
      </div>
    `;
    
    // Add close event listener
    modal.querySelector('span').addEventListener('click', closeModal);
    
    // Initialize Swiper if images exist
    if (project.images && project.images.length > 0) {
      setTimeout(() => {
        new Swiper('.project-modal-swiper', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }, 100);
    }
    
    // Show modal
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    
    function closeModal() {
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
    }
  }
});
