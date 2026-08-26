"use strict";

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector("header");
console.log(header);

const allSections = document.querySelectorAll("section");
console.log(allSections);

const heroSection = document.getElementById("hero");
console.log(heroSection);

const allNavbarLinks = document.getElementsByClassName("navbar__link");
console.log(allNavbarLinks);

const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

// Creating and Inserting Elements
const actionsMarkup = `
  <div class="actions">
    <button type="button" aria-label="Profile" class="actions__button">
      <img src="assets/icons/user.svg" alt="Profile" />
    </button>
    <button type="button" aria-label="Shopping Cart" class="actions__button">
      <img src="assets/icons/shopping-cart.svg" alt="Shopping Cart" />
    </button>

    <button type="button" aria-label="Mobile Navbar" class="actions__button actions__button--mobile-nav">
      <img src="assets/icons/menu.svg" alt="Open Navbar" />
      <img src="assets/icons/close.svg" alt="Close Navbar" />
    </button>
  </div>
  `;
header.insertAdjacentHTML("beforeend", actionsMarkup);

const cookieBanner = document.createElement("div");
cookieBanner.classList.add("cookie");

// cookieBanner.textContent = "We use cookies to improve performance and analytics.";
cookieBanner.innerHTML = `
  We use cookies to improve performance and analytics.
  <button type="button" class="btn cookie__btn">Accept All</button>
  `;

heroSection.append(cookieBanner);
// heroSection.prepend(cookieBanner);
// heroSection.append(cookieBanner.cloneNode(true));

// heroSection.before(cookieBanner);
// heroSection.after(cookieBanner);

// Deleting Elements
document.querySelector(".cookie__btn").addEventListener("click", function () {
  // cookieBanner.parentElement.removeChild(cookieBanner);
  cookieBanner.remove();
});

// Working with Styles
cookieBanner.style.backgroundColor = "var(--color-gray-dark)";
cookieBanner.style.width = "100%";

console.log(cookieBanner.style.color);
console.log(cookieBanner.style.backgroundColor);

console.log(getComputedStyle(cookieBanner).color);
console.log(getComputedStyle(cookieBanner).padding);

cookieBanner.style.padding =
  Number.parseFloat(getComputedStyle(cookieBanner).padding, 10) + 12 + "px";

document.documentElement.style.setProperty("--color-primary", "#5d4f7a");

// Working with Attributes
const logoImg = document.querySelector(".logo__img");
console.log(logoImg.alt);
console.log(logoImg.className);
logoImg.alt = "Beautiful Lampshade logo";

console.log(logoImg.designer);
console.log(logoImg.getAttribute("designer"));
logoImg.setAttribute("size", "normal");

console.log(logoImg.src);
console.log(logoImg.getAttribute("src"));

const aboutUsLink = document.querySelector("#about-us-link");
console.log(aboutUsLink.href);
console.log(aboutUsLink.getAttribute("href"));

// Data Attributes
console.log(logoImg.dataset.theme);

// Working with Classes
logoImg.classList.add("h", "z");
logoImg.classList.remove("h", "z");
logoImg.classList.toggle("h");
logoImg.classList.contains("h");
// logoImg.className = "h";

// Working with Event Handlers
const mainHeading = document.querySelector("h1");

const alertMainHeading = function (e) {
  alert("Heading hovered (addEventListener)");
};
mainHeading.addEventListener("mouseenter", alertMainHeading);
mainHeading.removeEventListener("mouseenter", alertMainHeading);

mainHeading.onmouseenter = function (e) {
  alert("Heading hovered (onmouseenter)");
};

// Event Propagation
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".navbar__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();

  console.group("Link Click Event");
  console.log("Target:", e.target);
  console.log("Current Target:", e.currentTarget);
  console.log("Is currentTarget equal to this?", e.currentTarget === this);
  console.groupEnd();

  // Stop Propagation
  // e.stopPropagation();
});

document.querySelector(".navbar").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();

  console.group("Navbar Click Event");
  console.log("Target:", e.target);
  console.log("Current Target:", e.currentTarget);
  console.groupEnd();
});

document.querySelector("header").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();

    console.group("Header Click Event");
    console.log("Target:", e.target);
    console.log("Current Target:", e.currentTarget);
    console.groupEnd();
  },
  // true,
);

// DOM Traversing
// Going Downwards: Child
console.log(header.querySelectorAll(".logo"));
console.log(header.childNodes);
console.log(header.children);
console.log(header.firstElementChild);
console.log(header.lastElementChild);

// Going Upwards: Parents
console.log(header.parentNode);
console.log(header.parentElement);

console.log(mainHeading.closest("section"));
console.log(mainHeading.closest("h1"));

// Going Sideways: Siblings
console.log(mainHeading.previousSibling);
console.log(mainHeading.nextSibling);

console.log(mainHeading.previousElementSibling);
console.log(mainHeading.nextElementSibling);

console.log(mainHeading.parentElement.children);

// Lifecycle DOM Events
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("DOM tree built after HTML parsing and synchronous JavaScript execution", e);
});

window.addEventListener("load", function (e) {
  console.log("All page resources (images, styles, fonts, etc.) fully loaded", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log("User attempting to leave or reload the page - beforeunload triggered", e);
  e.returnValue = "";
});
