document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navbar Toggle Setup
  const toggler = document.querySelector(".navbar-toggler");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  if (toggler && navbar) {
    // Manual Toggle Click Handler
    toggler.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.toggle("show");
      
      const isOpen = navbar.classList.contains("show");
      toggler.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !toggler.contains(e.target)) {
        navbar.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Stats Section Counter
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.getElementById("statsSection");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // Animation time in milliseconds
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); 

      // Ease-out cubic formula for smooth slowdown at the end
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutProgress * target);

      if (currentVal >= 1000 && progress === 1) {
        counter.innerText = (currentVal / 1000).toFixed(0) + "K";
      } else {
        counter.innerText = currentVal.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => animateCounter(counter));
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  // 3. Header Scroll Background Toggle
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
  // hero counter
  const counterElement = document.querySelector(".card-stat--ring h2");
  
  if (!counterElement) return;

  const targetNumber = 98;
  const duration = 4500; // 4.5 seconds (matches SCSS ring animation duration)
  const delay = 400;     // 0.4s initial delay to match SCSS
  const intervalTime = 30; // smooth update frequency

  const steps = duration / intervalTime;
  const increment = targetNumber / steps;
  let currentVal = 0;

  setTimeout(() => {
    const timer = setInterval(() => {
      currentVal += increment;
      if (currentVal >= targetNumber) {
        counterElement.textContent = `${targetNumber}%`;
        clearInterval(timer);
      } else {
        counterElement.textContent = `${Math.floor(currentVal)}%`;
      }
    }, intervalTime);
  }, delay);
  // footer date
  const date = new Date()
    const year  = date.getFullYear()
    const copyright = document.getElementById('current-year')
    copyright.textContent += ` ${year}`
});