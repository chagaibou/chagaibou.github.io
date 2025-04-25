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

// Gestion des cartes projets pour mobile
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Sur mobile, toggle une classe active au lieu de hover
      if (window.innerWidth <= 768) {
        projectCards.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Réinitialise quand on clique ailleurs
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".project-card") && window.innerWidth <= 768) {
      projectCards.forEach((c) => c.classList.remove("active"));
    }
  });
});
