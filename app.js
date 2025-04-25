// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// Scroll animation
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

fadeElements.forEach((element) => {
  fadeInObserver.observe(element);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");

const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = "0";
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

skillBars.forEach((bar) => {
  skillBarObserver.observe(bar);
});

document.querySelectorAll(".project-card").forEach((card) => {
  // Pour les écrans tactiles
  card.addEventListener("touchstart", function () {
    this.classList.toggle("active");
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  });

  // Gestion optimale pour mobile
  document.querySelectorAll(".project-card").forEach((card) => {
    let touchTimer;

    card.addEventListener("touchstart", function (e) {
      e.preventDefault();
      touchTimer = setTimeout(() => {
        this.classList.toggle("flipped");
      }, 200); // Délai pour éviter les déclenchements accidentels
    });

    card.addEventListener("touchend", function () {
      clearTimeout(touchTimer);
    });
  });

  // Pour la souris (au cas où)
  card.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      // Seulement sur mobile
      this.classList.toggle("active");
    }
  });
});
