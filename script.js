// ======================================
// Elements
// ======================================

const gallery = document.getElementById("gallery");

const menuButtons = document.querySelectorAll(".menu-btn");
const langButtons = document.querySelectorAll(".lang-btn");


// ======================================
// Current State
// ======================================

let currentLanguage = localStorage.getItem("language") || "en";
let currentMenu = localStorage.getItem("menu") || "menu";


// ======================================
// Render Images
// ======================================

function renderGallery() {

    gallery.classList.remove("fade");

    void gallery.offsetWidth;

    gallery.classList.add("fade");

    gallery.innerHTML = `
        <img
            class="menu-image"
            src="images/${currentLanguage}/${currentMenu}1.jpg"
            alt="Menu Page 1"
            loading="lazy"
            draggable="false"
        >

        <img
            class="menu-image"
            src="images/${currentLanguage}/${currentMenu}2.jpg"
            alt="Menu Page 2"
            loading="lazy"
            draggable="false"
        >
    `;

}


// ======================================
// Update Buttons
// ======================================

function updateButtons() {

    menuButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.menu === currentMenu
        );

    });

    langButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === currentLanguage
        );

    });

}


// ======================================
// Save State
// ======================================

function saveState() {

    localStorage.setItem("language", currentLanguage);
    localStorage.setItem("menu", currentMenu);

}


// ======================================
// Language
// ======================================

langButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentLanguage = button.dataset.lang;

        updateButtons();

        renderGallery();

        saveState();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ======================================
// Menu
// ======================================

menuButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentMenu = button.dataset.menu;

        updateButtons();

        renderGallery();

        saveState();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ======================================
// Initial Load
// ======================================

updateButtons();

renderGallery();