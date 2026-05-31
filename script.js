"use strict";

// TODO: add scrolling behavior for all buttons

const headerEl = document.querySelector("header");
const navbarEl = document.querySelector(".navbar");
const mobileNavbarButton = document.querySelector(".actions__button--mobile-nav");
const heroSectionEl = document.querySelector(".hero");
const scrollToTopButton = document.querySelector(".scrollToTop");
const slides = document.querySelectorAll(".testimonials__slide");
const testimonialsLeftButton = document.querySelector(".testimonials__btn--left");
const testimonialsRightButton = document.querySelector(".testimonials__btn--right");
const indicators = document.querySelector(".testimonials__indicators");

const headerHeight = headerEl.offsetHeight;

mobileNavbarButton.addEventListener("click", function () {
  navbarEl.classList.toggle("mobile-navbar");

  if (navbarEl.classList.contains("mobile-navbar")) {
    document.body.classList.add("overflow-y-hidden");
  } else {
    document.body.classList.remove("overflow-y-hidden");
  }
});

navbarEl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("navbar__link")) {
    const href = e.target.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const section = document.querySelector(href);
      const offsetTop = section.offsetTop - headerHeight;

      if (href === "#contact-us") {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }

    if (navbarEl.classList.contains("mobile-navbar")) {
      navbarEl.classList.remove("mobile-navbar");
      document.body.classList.remove("overflow-y-hidden");
    }

    e.target.blur();
  }
});

const heroObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    const isHeroVisible = entry.isIntersecting;

    headerEl.classList.toggle("sticky", !isHeroVisible);

    scrollToTopButton.classList.toggle("scrollToTop--visible", !isHeroVisible);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  },
);
heroObserver.observe(heroSectionEl);

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  const createIndicators = function () {
    slides.forEach(function (_, i) {
      indicators.insertAdjacentHTML(
        "beforeend",
        `<button class="indicator" data-slide="${i}"></button>`,
      );
    });
  };

  const activateIndicator = function (slide) {
    document
      .querySelectorAll(".indicator")
      .forEach((dot) => dot.classList.remove("indicator--active"));

    document.querySelector(`.indicator[data-slide="${slide}"]`).classList.add("indicator--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateIndicator(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateIndicator(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createIndicators();
    activateIndicator(0);
  };
  init();

  testimonialsLeftButton.addEventListener("click", prevSlide);
  testimonialsRightButton.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" ? prevSlide() : nextSlide();
  });

  indicators.addEventListener("click", function (e) {
    if (e.target.classList.contains("indicator")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateIndicator(slide);
    }
  });
};
slider();
