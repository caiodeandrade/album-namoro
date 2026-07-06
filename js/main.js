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

    const frame = document.createElement("div");
    frame.className = "entry-frame";

    const img = document.createElement("img");
    img.src = section.photo;
    img.alt = section.alt;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";
    frame.appendChild(img);
    figure.appendChild(frame);

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

  // --- Floating hearts background ---
  const canvas = document.getElementById("hearts-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    const HEARTS = ["💗", "💕", "♥", "✦"];
    const COLORS = ["rgba(251,113,133,", "rgba(249,168,212,", "rgba(252,211,77,"];
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 30,
      size: 8 + Math.random() * 14,
      speed: 0.3 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: 0.15 + Math.random() * 0.35,
      glyph: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      wobble: Math.random() * Math.PI * 2,
    });

    // ~1 particle per 60px of width, capped for mobile perf
    const count = Math.min(28, Math.floor(window.innerWidth / 60));
    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.y -= p.speed;
        p.wobble += 0.02;
        p.x += p.drift + Math.sin(p.wobble) * 0.3;
        if (p.y < -30) particles[i] = spawn();

        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.glyph, p.x, p.y);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    };
    tick();
  }

  // --- Animations ---
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Global scroll progress bar + traveling heart
  const progressBar = document.getElementById("progress-bar");
  const progressHeart = document.getElementById("progress-heart");
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const pct = self.progress * 100;
      progressBar.style.width = pct + "%";
      progressHeart.style.left = pct + "%";
    },
  });

  if (prefersReducedMotion) {
    return;
  }

  // Hero intro timeline (plays on load)
  gsap.from(".hero-label, .hero-heart, .hero-title, .hero-subtitle, .hero-date", {
    opacity: 0,
    y: 26,
    duration: 0.9,
    stagger: 0.14,
    ease: "power2.out",
  });

  document.querySelectorAll(".entry").forEach((entry, index) => {
    const figure = entry.querySelector(".entry-figure");
    const img = entry.querySelector(".entry-frame img");
    const message = entry.querySelector(".entry-message");
    const caption = entry.querySelector(".entry-caption");
    const fromLeft = index % 2 === 0;

    // Polaroid swings in from the side, settling into its tilt
    gsap.from(figure, {
      opacity: 0,
      x: fromLeft ? -80 : 80,
      rotate: fromLeft ? -10 : 10,
      scale: 0.9,
      duration: 1.1,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: entry,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    // Message card floats up just after the photo
    const revealTargets = [caption, message].filter(Boolean);
    gsap.from(revealTargets, {
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.9,
      stagger: 0.15,
      delay: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: entry,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    // Subtle parallax inside the polaroid frame
    gsap.fromTo(
      img,
      { yPercent: 6 },
      {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: entry,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  // Outro: heart scales in with a bounce, texts follow
  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".outro",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });
  outroTl
    .from(".outro-heart", { scale: 0, rotate: -20, duration: 0.9, ease: "elastic.out(1, 0.45)" })
    .from(".outro-title", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" }, "-=0.4")
    .from(".outro-message", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.35")
    .from(".outro-sign", { opacity: 0, duration: 0.8 }, "-=0.2");
})();
