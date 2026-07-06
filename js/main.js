(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Hero / outro text ---
  document.getElementById("hero-title").textContent = ALBUM_DATA.hero.title;
  document.getElementById("hero-subtitle").textContent = ALBUM_DATA.hero.subtitle;
  document.getElementById("hero-date").textContent = ALBUM_DATA.hero.date;
  document.getElementById("outro-title").textContent = ALBUM_DATA.outro.title;
  document.getElementById("outro-message").textContent = ALBUM_DATA.outro.message;

  // --- Render sections from data ---
  const album = document.getElementById("album");

  ALBUM_DATA.sections.forEach((section, index) => {
    const entry = document.createElement("section");
    entry.className = "entry" + (index % 2 === 1 ? " reverse" : "");
    entry.dataset.index = index;

    const figure = document.createElement("figure");
    figure.className = "entry-figure";

    const img = document.createElement("img");
    img.src = section.photo;
    img.alt = section.alt;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";
    figure.appendChild(img);

    entry.appendChild(figure);

    const textWrap = document.createElement("div");

    if (section.caption) {
      const caption = document.createElement("p");
      caption.className = "entry-caption";
      caption.textContent = section.caption;
      textWrap.appendChild(caption);
    }

    const message = document.createElement("p");
    message.className = "entry-message";
    message.textContent = section.message;
    textWrap.appendChild(message);

    entry.appendChild(textWrap);
    album.appendChild(entry);
  });

  // --- Animations ---
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Global scroll progress bar
  const progressBar = document.getElementById("progress-bar");
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      progressBar.style.width = self.progress * 100 + "%";
    },
  });

  if (prefersReducedMotion) {
    gsap.set(".entry-figure img, .entry-message", { opacity: 1 });
    return;
  }

  document.querySelectorAll(".entry").forEach((entry) => {
    const img = entry.querySelector(".entry-figure img");
    const message = entry.querySelector(".entry-message");
    const caption = entry.querySelector(".entry-caption");

    // Fade + scale-in as the entry comes into view
    gsap.from(img, {
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: entry,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Text reveal, slightly after the photo
    const revealTargets = [caption, message].filter(Boolean);
    gsap.from(revealTargets, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: entry,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Subtle parallax inside the frame
    gsap.to(img, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: entry,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Short pin on the hero title while the subtitle/date settle in
  const hero = document.querySelector(".hero");
  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "+=300",
    pin: true,
    pinSpacing: true,
  });
})();
