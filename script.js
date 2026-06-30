import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe-lightbox.esm.min.js";

const gallery = document.getElementById("gallery");

const menuButtons = document.querySelectorAll(".menu-btn");
const langButtons = document.querySelectorAll(".lang-btn");

let currentLanguage = localStorage.getItem("language") || "en";
let currentMenu = localStorage.getItem("menu") || "menu";

let lightbox;

function createGallery() {
  gallery.innerHTML = "";

  for (let i = 1; i <= 2; i++) {
    const link = document.createElement("a");

    link.href = `images/${currentLanguage}/${currentMenu}${i}.jpg`;

    link.dataset.pswpWidth = "2480";
    link.dataset.pswpHeight = "3508";

    const image = document.createElement("img");

    image.src = `images/${currentLanguage}/${currentMenu}${i}.jpg`;

    image.className = "menu-image";

    image.loading = "lazy";

    image.draggable = false;

    image.alt = `Page ${i}`;

    link.appendChild(image);

    gallery.appendChild(link);
  }
}

function updateButtons() {
  menuButtons.forEach((button) => {
    button.classList.toggle(
      "active",

      button.dataset.menu === currentMenu
    );
  });

  langButtons.forEach((button) => {
    button.classList.toggle(
      "active",

      button.dataset.lang === currentLanguage
    );
  });
}

function saveState() {
  localStorage.setItem(
    "language",

    currentLanguage
  );

  localStorage.setItem(
    "menu",

    currentMenu
  );
}

function reloadGallery() {
  createGallery();

  updateButtons();

  saveState();

  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery",

    children: "a",

    pswpModule: () =>
      import(
        "https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.min.js"
      ),
  });

  lightbox.init();
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentMenu = button.dataset.menu;

    reloadGallery();

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.lang;

    reloadGallery();

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
});

reloadGallery();
