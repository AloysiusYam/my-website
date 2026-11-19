/* =========================================================
   Small extras for the website.
   The site still works and looks fine if this file doesn't load.
   ========================================================= */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasScrollAnimations = window.CSS && CSS.supports("animation-timeline: view()");

  /* ---------- 1. Back-ups for browsers without scroll-driven CSS (e.g. Firefox) ---------- */
  if (!hasScrollAnimations && !reduceMotion) {

    // Progress bar along the top
    var bar = document.querySelector(".progress");
    if (bar) {
      var ticking = false;
      var updateBar = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.setProperty("--progress", max > 0 ? window.scrollY / max : 0);
        ticking = false;
      };
      window.addEventListener("scroll", function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateBar);
        }
      }, { passive: true });
      updateBar();
    }

    // Fade things in as they scroll into view.
    // Keep this list the same as the "(B)" list in style.css.
    var REVEAL_TARGETS = ".section-body > p, .facts > div, .interests > div, .job, " +
      ".doc-list li, .quotes blockquote, .stats li, .contact .wrap > *, .split > h2";

    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("io-reveal");
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px" });

      document.querySelectorAll(REVEAL_TARGETS).forEach(function (el) {
        el.classList.add("reveal");
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- 2. (H) Numbers count up from 0 when they appear ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var countUp = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var duration = 1400;
      var start = null;
      var step = function (time) {
        if (start === null) start = time;
        var t = Math.min((time - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3); // starts fast, slows down at the end
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) {
      el.textContent = "0";
      countObserver.observe(el);
    });
  }

  /* ---------- 3. (E) Glow on interest cards follows the mouse ---------- */
  if (finePointer) {
    document.querySelectorAll(".interests > div").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var box = card.getBoundingClientRect();
        card.style.setProperty("--x", (e.clientX - box.left) + "px");
        card.style.setProperty("--y", (e.clientY - box.top) + "px");
      });
    });
  }

  /* ---------- 4. "Magnetic" buttons lean slightly toward the mouse ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var box = btn.getBoundingClientRect();
        var x = (e.clientX - box.left - box.width / 2) * 0.25;
        var y = (e.clientY - box.top - box.height / 2) * 0.35;
        btn.style.translate = x + "px " + y + "px";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.translate = "";
      });
    });
  }
})();
