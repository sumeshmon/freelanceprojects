document.addEventListener("DOMContentLoaded", () => {
  // Utility selector function
  const $ = (id) => document.getElementById(id);

  /* ==========================================================================
     1. DEMO FORM SUBMISSION
     ========================================================================== */
  const initDemoForm = () => {
    const form = $("notifyForm");
    const submitBtn = $("submitBtn");
    const statusMessage = $("statusMessage");

    if (!form || !submitBtn || !statusMessage) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Disable button & set loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="btn-text">Sending...</span>`;
      statusMessage.textContent = "";
      statusMessage.className = "status-message";

      // Gather Form Data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://formsubmit.co/ajax/info@nayx.ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: "New Launch Notification Sign-up!",
            _template: "table",
            Name: data.name,
            Company: data.company,
            Title: data.title,
            Email: data.email,
            Phone: data.phone,
            Role: data.role,
            Reason: data.reason
          })
        });

        if (response.ok) {
          statusMessage.textContent = "Thank you! Your details have been submitted successfully.";
          statusMessage.classList.add("success");
          form.reset();
        } else {
          throw new Error("Form submission failed.");
        }
      } catch (error) {
        statusMessage.textContent = "Oops! Something went wrong. Please try again.";
        statusMessage.classList.add("error");
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg class="send-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
          <span class="btn-text">Notify Me</span>
        `;
      }
    });
  };

  /* ==========================================================================
     2. DEMO VIDEO PLAYER
     ========================================================================== */
  const initVideoPlayer = () => {
    const video = $("demoVideo");
    if (!video) return;

    const elements = {
      centerPlayBtn: $("centerPlayBtn"),
      ctrlPlayBtn: $("ctrlPlayBtn"),
      playPauseIcon: $("playPauseIcon"),
      progressBarWrap: $("progressBarWrap"),
      progressBarFill: $("progressBarFill"),
      currentTime: $("currentTime"),
      duration: $("duration"),
      muteBtn: $("muteBtn"),
      fullscreenBtn: $("fullscreenBtn")
    };

    const SVG_PLAY = '<polygon points="5 3 19 12 5 21 5 3" fill="#ffffff"/>';
    const SVG_PAUSE = '<rect x="6" y="4" width="4" height="16" fill="#ffffff"/><rect x="14" y="4" width="4" height="16" fill="#ffffff"/>';

    const formatTime = (secs) => {
      const mins = Math.floor(secs / 60);
      const remainder = Math.floor(secs % 60).toString().padStart(2, "0");
      return `${mins}:${remainder}`;
    };

    const togglePlay = () => (video.paused ? video.play() : video.pause());

    // Attach play/pause triggers
    [elements.centerPlayBtn, elements.ctrlPlayBtn, video].forEach((el) => {
      el?.addEventListener("click", togglePlay);
    });

    // UI State Sync
    video.addEventListener("play", () => {
      elements.centerPlayBtn?.classList.add("is-playing");
      if (elements.playPauseIcon) elements.playPauseIcon.innerHTML = SVG_PAUSE;
    });

    video.addEventListener("pause", () => {
      elements.centerPlayBtn?.classList.remove("is-playing");
      if (elements.playPauseIcon) elements.playPauseIcon.innerHTML = SVG_PLAY;
    });

    // Progress Bar & Time Update
    video.addEventListener("timeupdate", () => {
      if (!video.duration) return;
      const percentage = (video.currentTime / video.duration) * 100;
      if (elements.progressBarFill) elements.progressBarFill.style.width = `${percentage}%`;
      if (elements.currentTime) elements.currentTime.textContent = formatTime(video.currentTime);
    });

    video.addEventListener("loadedmetadata", () => {
      if (elements.duration) elements.duration.textContent = formatTime(video.duration);
    });

    // Seek video location on progress bar click
    elements.progressBarWrap?.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    });

    // Mute button
    elements.muteBtn?.addEventListener("click", () => {
      video.muted = !video.muted;
      elements.muteBtn.style.opacity = video.muted ? "0.5" : "1";
    });

    // Fullscreen toggle
    elements.fullscreenBtn?.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        (video.requestFullscreen || video.webkitRequestFullscreen)?.call(video);
      }
    });
  };

  /* ==========================================================================
     3. FAQ ACCORDION
     ========================================================================== */
  const initFAQ = () => {
    const faqButtons = document.querySelectorAll(".faq-question");
    if (!faqButtons.length) return;

    faqButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentItem = button.parentElement;
        const isActive = currentItem.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active");
        });

        if (!isActive) {
          currentItem.classList.add("active");
        }
      });
    });
  };

  /* ==========================================================================
     4. CAROUSEL
     ========================================================================== */
  const initCarousel = () => {
    const track = $("carouselTrack");
    const prevBtn = $("prevBtn");
    const nextBtn = $("nextBtn");

    if (!track) return;

    const scrollAmount = 384; // 360px card + 24px gap

    nextBtn?.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn?.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    let autoPlayTimer;

    const startAutoPlay = () => {
      autoPlayTimer = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3500);
    };

    const stopAutoPlay = () => clearInterval(autoPlayTimer);

    startAutoPlay();
    track.addEventListener("mouseenter", stopAutoPlay);
    track.addEventListener("mouseleave", startAutoPlay);
  };

  /* ==========================================================================
     5. MOBILE NAVBAR TOGGLE
     ========================================================================== */
  const initNavbar = () => {
    const toggler = document.querySelector(".navbar-toggler");
    const navbar = $("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!toggler || !navbar) return;

    toggler.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.toggle("show");
      toggler.setAttribute("aria-expanded", navbar.classList.contains("show"));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !toggler.contains(e.target)) {
        navbar.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
      }
    });
  };

  /* ==========================================================================
     6. STATS SECTION COUNTER
     ========================================================================== */
  const initStatsCounter = () => {
    const counters = document.querySelectorAll(".counter");
    const statsSection = $("statsSection");

    if (!statsSection || !counters.length) return;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
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

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => animateCounter(counter));
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(statsSection);
  };

  /* ==========================================================================
     7. HEADER SCROLL BACKGROUND
     ========================================================================== */
  const initHeaderScroll = () => {
    const header = document.querySelector(".header");
    if (!header) return;

    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 80);
      },
      { passive: true }
    );
  };

  /* ==========================================================================
     8. HERO RING COUNTER
     ========================================================================== */
  const initHeroCounter = () => {
    const counterElement = document.querySelector(".card-stat--ring h2");
    if (!counterElement) return;

    const targetNumber = 98;
    const duration = 4500;
    const delay = 400;
    const intervalTime = 30;

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
  };

  /* ==========================================================================
     9. FOOTER COPYRIGHT YEAR
     ========================================================================== */
  const initFooterYear = () => {
    const copyright = $("current-year");
    if (copyright) {
      copyright.textContent = new Date().getFullYear();
    }
  };

  // Initialize all components
  initDemoForm();
  initVideoPlayer();
  initFAQ();
  initCarousel();
  initNavbar();
  initStatsCounter();
  initHeaderScroll();
  initHeroCounter();
  initFooterYear();
});