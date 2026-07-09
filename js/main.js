(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Hero / outro text ---
  document.getElementById("hero-title").textContent = ALBUM_DATA.hero.title;
  document.getElementById("hero-subtitle").textContent = ALBUM_DATA.hero.subtitle;
  document.getElementById("hero-date").textContent = ALBUM_DATA.hero.date;
  document.getElementById("intro-text").innerHTML = ALBUM_DATA.intro.replace(/\n\n/g, "<br><br>");
  document.getElementById("outro-title").textContent = ALBUM_DATA.outro.title;
  document.getElementById("outro-message").textContent = ALBUM_DATA.outro.message;

  // --- Live counter (tempo juntos) ---
  const startDate = ALBUM_DATA.hero.startDate;
  if (startDate) {
    const start = new Date(startDate + "T00:00:00");
    const pad = (n) => String(n).padStart(2, "0");
    const els = {
      years: document.getElementById("c-years"),
      months: document.getElementById("c-months"),
      days: document.getElementById("c-days"),
      time: document.getElementById("c-time"),
    };

    const updateCounter = () => {
      const now = new Date();
      let sec = now.getSeconds() - start.getSeconds();
      let min = now.getMinutes() - start.getMinutes();
      let hr = now.getHours() - start.getHours();
      let day = now.getDate() - start.getDate();
      let mon = now.getMonth() - start.getMonth();
      let yr = now.getFullYear() - start.getFullYear();

      if (sec < 0) { sec += 60; min--; }
      if (min < 0) { min += 60; hr--; }
      if (hr < 0) { hr += 24; day--; }
      if (day < 0) {
        // dias do mês anterior ao atual
        const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        day += prevMonthDays;
        mon--;
      }
      if (mon < 0) { mon += 12; yr--; }

      els.years.textContent = yr;
      els.months.textContent = mon;
      els.days.textContent = day;
      els.time.textContent = `${pad(hr)}:${pad(min)}:${pad(sec)}`;
    };

    updateCounter();
    setInterval(updateCounter, 1000);
  }

  // --- Render sections from data (with timeline markers) ---
  const album = document.getElementById("album");

  // Trilho da linha do tempo
  const timeline = document.createElement("div");
  timeline.className = "timeline";
  const timelineProgress = document.createElement("div");
  timelineProgress.className = "timeline-progress";
  timeline.appendChild(timelineProgress);
  album.appendChild(timeline);

  ALBUM_DATA.sections.forEach((section, index) => {
    const entry = document.createElement("section");
    entry.className = "entry";
    entry.dataset.index = index;

    // Marcador da timeline: ponto + data
    const dot = document.createElement("span");
    dot.className = "entry-dot";
    dot.setAttribute("aria-hidden", "true");
    entry.appendChild(dot);

    if (section.date) {
      const date = document.createElement("time");
      date.className = "entry-date";
      date.textContent = section.date;
      entry.appendChild(date);
    }

    // Linha (foto + texto)
    const row = document.createElement("div");
    row.className = "entry-row" + (index % 2 === 1 ? " reverse" : "");

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
    row.appendChild(figure);

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

    row.appendChild(textWrap);
    entry.appendChild(row);
    album.appendChild(entry);
  });

  // --- Background music (YouTube IFrame API) ---
  const musicConfig = ALBUM_DATA.music;
  const musicToggle = document.getElementById("music-toggle");
  if (musicConfig && musicConfig.videoId && musicToggle) {
    let player = null;
    let playerReady = false;
    let isPlaying = false;
    let started = false;
    const hint = document.getElementById("music-hint");

    const createPlayer = () => {
      if (player) return;
      player = new YT.Player("yt-player", {
        videoId: musicConfig.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: musicConfig.videoId, // necessário para loop de um vídeo só
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            playerReady = true;
            e.target.setVolume(musicConfig.volume ?? 40);
          },
          onStateChange: (e) => {
            isPlaying = e.data === YT.PlayerState.PLAYING;
            musicToggle.classList.toggle("is-playing", isPlaying);
          },
        },
      });
    };

    const trySetup = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return true;
      }
      return false;
    };

    // Registra o callback oficial e usa polling como rede de segurança,
    // já que a ordem de carregamento da API pode variar.
    window.onYouTubeIframeAPIReady = createPlayer;
    if (!trySetup()) {
      if (!document.querySelector('script[src*="iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const poll = setInterval(() => {
        if (trySetup()) clearInterval(poll);
      }, 200);
      setTimeout(() => clearInterval(poll), 15000);
    }

    const startMusic = () => {
      if (!playerReady || started) return;
      started = true;
      player.playVideo();
      if (hint) hint.classList.add("hidden");
    };

    const toggleMusic = () => {
      if (!playerReady) return;
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      if (hint) hint.classList.add("hidden");
    };

    // Primeiro toque em qualquer lugar já inicia a música
    const onFirstGesture = () => {
      startMusic();
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);

    // O botão controla play/pause depois de iniciado
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!started) {
        startMusic();
      } else {
        toggleMusic();
      }
    });

    // Esconde a dica depois de um tempo mesmo sem interação
    setTimeout(() => hint && hint.classList.add("hidden"), 8000);
  }

  // --- Floating hearts background ---
  const canvas = document.getElementById("hearts-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    const HEARTS = ["💗", "💕", "♥", "✦"];
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

  // Counter entra na tela
  gsap.from(".counter-unit", {
    opacity: 0,
    y: 18,
    duration: 0.7,
    stagger: 0.1,
    delay: 0.6,
    ease: "power2.out",
  });

  if (prefersReducedMotion) {
    gsap.set(".timeline-progress", { scaleY: 1 });
    document.querySelectorAll(".entry-dot").forEach((d) => d.classList.add("is-active"));
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

  // Intro letter animation (scrolls into view)
  gsap.from(".intro-letter-content", {
    opacity: 0,
    scale: 0.95,
    y: 40,
    duration: 1.2,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: ".intro-letter",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Linha do tempo: a barra preenche conforme rola o álbum
  gsap.to(".timeline-progress", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#album",
      start: "top 60%",
      end: "bottom 70%",
      scrub: true,
    },
  });

  document.querySelectorAll(".entry").forEach((entry, index) => {
    const figure = entry.querySelector(".entry-figure");
    const img = entry.querySelector(".entry-frame img");
    const message = entry.querySelector(".entry-message");
    const caption = entry.querySelector(".entry-caption");
    const date = entry.querySelector(".entry-date");
    const dot = entry.querySelector(".entry-dot");
    const fromLeft = index % 2 === 0;

    // Acende o ponto da timeline quando a entry entra em cena
    ScrollTrigger.create({
      trigger: entry,
      start: "top 65%",
      end: "bottom 40%",
      onToggle: (self) => dot.classList.toggle("is-active", self.isActive),
    });

    // Marcador (data) surge
    if (date) {
      gsap.from(date, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: entry,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }

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
        start: "top 72%",
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
        start: "top 72%",
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
