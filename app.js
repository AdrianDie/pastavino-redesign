(function () {
  "use strict";

  /* Hero video: some browsers/extensions don't honor the autoplay
     attribute reliably, so force play() as a fallback. Retries once
     on the page's first click/scroll/touch in case autoplay was
     blocked outright (then requires a user gesture). */
  var heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    var tryPlay = function () {
      var p = heroVideo.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          ["click", "scroll", "touchstart", "keydown"].forEach(function (evt) {
            document.addEventListener(evt, tryPlay, { once: true, passive: true });
          });
        });
      }
    };
    tryPlay();
  }

  /* Header: solid background after scrolling past hero start */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile off-canvas nav */
  var hamburger = document.getElementById("hamburger");
  var navClose = document.getElementById("navClose");
  var mainNav = document.getElementById("mainNav");
  var navScrim = document.getElementById("navScrim");

  function openNav() {
    mainNav.classList.add("is-open");
    navScrim.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    mainNav.classList.remove("is-open");
    navScrim.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", openNav);
  navClose.addEventListener("click", closeNav);
  navScrim.addEventListener("click", closeNav);
  mainNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  /* Menu category tabs */
  var tabs = document.querySelectorAll(".menu-tab");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      panels.forEach(function (p) {
        var match = p.getAttribute("data-panel") === target;
        p.classList.toggle("is-active", match);
        if (match) {
          p.removeAttribute("hidden");
        } else {
          p.setAttribute("hidden", "");
        }
      });
    });
  });

  /* Scroll reveal via IntersectionObserver */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
