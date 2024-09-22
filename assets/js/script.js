"use strict";

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i]);
    }
    elemToggleFunc(skillsBox);
  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/**
 * For Load more images
 */

document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");
  const loadMoreBtn = document.querySelector(".load-more");
  const closeProjectsBtn = document.querySelector(".close-projects");
  let itemsToShow = 5;

  projectItems.forEach((item, index) => {
    if (index >= itemsToShow) {
      item.style.display = "none";
    }
  });

  loadMoreBtn.addEventListener("click", () => {
    projectItems.forEach((item, index) => {
      if (index >= itemsToShow) {
        item.style.display = "block";
      }
    });
    loadMoreBtn.style.display = "none";
    closeProjectsBtn.style.display = "block";
  });

  closeProjectsBtn.addEventListener("click", () => {
    projectItems.forEach((item, index) => {
      if (index >= itemsToShow) {
        item.style.display = "none";
      }
    });
    closeProjectsBtn.style.display = "none";
    loadMoreBtn.style.display = "block";
  });
});

/**
 * Form Submission
 */

function handleSubmit(event) {
  event.preventDefault();

  const statusDiv = document.getElementById("submission-status");
  statusDiv.style.display = "block";
  statusDiv.style.backgroundColor = "yellow";
  statusDiv.style.color = "black";
  statusDiv.textContent = "Submitting...";

  const formData = new FormData(event.target);

  fetch(event.target.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        statusDiv.style.backgroundColor = "green";
        statusDiv.style.color = "white";
        statusDiv.textContent = "Submitted successfully";
      } else {
        statusDiv.style.backgroundColor = "red";
        statusDiv.style.color = "white";
        statusDiv.textContent = "Submission failed";
      }

      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 5000);
    })
    .catch((error) => {
      statusDiv.style.backgroundColor = "red";
      statusDiv.style.color = "white";
      statusDiv.textContent = "Submission failed";
      console.error("Error:", error);

      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 5000);
    });
}

// PreLoader

var loader = document.getElementById("preloader");
var content = document.getElementById("content");

window.addEventListener("load", function(){
    setTimeout(function(){
        loader.classList.add("hide-preloader");
        content.style.display = "block"; // Show the main content
    }, 2000); // 2000ms = 2 seconds
});


/**
 * Prevent Image download & inspect
 */
 document.addEventListener("contextmenu", (event) => event.preventDefault());
