document.addEventListener("DOMContentLoaded", () => {
  // demo form
  const form = document.getElementById("notifyForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusMessage = document.getElementById("statusMessage");

  if (!form) return;

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
      // Send data to info@nayx.ai via FormSubmit endpoint
      const response = await fetch("https://formsubmit.co/ajax/sumeshmon2006@gmail.com", {
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
  // demo video
  const $ = (id) => document.getElementById(id);

  const videoNextBtn = $("nextBtn");
  const videoTrack = $("track");
  const videoScrollAmount = 300;

  videoNextBtn?.addEventListener("click", () => {
    videoTrack?.scrollBy({ left: videoScrollAmount, behavior: "smooth" });
  });

  // Video Player Logic
  const video = $("demoVideo");
  if (!video) return;

  const elements = {
    watchDemoBtn: $("watchDemoBtn"),
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

  // Attach play/pause triggers safely
  [elements.centerPlayBtn, elements.ctrlPlayBtn, video].forEach((el) => {
    el?.addEventListener("click", togglePlay);
  });

  // Watch Demo action: Smooth scroll to video and play immediately
  elements.watchDemoBtn?.addEventListener("click", () => {
    video.scrollIntoView({ behavior: "smooth", block: "center" });
    video.play();
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
  // faq
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const currentItem = button.parentElement;
      const isActive = currentItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });
  // carousel
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const scrollAmount = 384; // 360px card + 24px gap

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  let autoPlay = setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 3500);

  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
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
  const year = date.getFullYear()
  const copyright = document.getElementById('current-year')
  copyright.textContent += ` ${year}`

});