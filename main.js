const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

// carousel constants
const carouselNavigation = document.getElementById("carousel-navigation");
const carouselButtons = document.querySelectorAll(".carousel-btn");
const slides = document.getElementById("carousel-slides");

// Desktop width
const desktopQuery = window.matchMedia('(min-width: 768px)');

// Handling inert attribute according to screen sizes
function handleResize(e) {
    if (e.matches) {
        // Desktop: make nav interactive, remove inert, ensure menu open
        menu.removeAttribute('inert');
    } else {
        if (menuBtn.getAttribute("aria-expanded") === "false") {
            // Mobile: nav might be hidden, inert added by default
            menu.setAttribute('inert', '');
        }
    }
}

// Listen for changes
desktopQuery.addEventListener('change', handleResize);

// Initial check
handleResize(desktopQuery);

const setInert = (el, inert) => {
    if (!el) return;

    // check if browser supports native API
    if ('inert' in HTMLElement.prototype) {
        // set the native property to true/false - the subtree becomes non-interactive
        el.inert = inert;
    } else {
        // polyfill listens for attribute changes
        if (inert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
    }

    el.setAttribute('aria-hidden', inert ? 'true' : 'false');
};

const toggleMenu = () => {

    if (menuBtn.getAttribute("aria-expanded") === "false") {
        menuBtn.setAttribute("aria-expanded", true)
        setInert(menu, false);
    }
    else {
        menuBtn.setAttribute("aria-expanded", false)
        setInert(menu, true);
    }

    // Toggle classes
    menu.classList.toggle("-translate-y-50")
    menu.classList.toggle("translate-y-0")
    menuIcon.classList.toggle("fa-bars")
    menuIcon.classList.toggle("fa-close")
    menuBtn.classList.toggle("text-cust-grey-500")
    menuBtn.classList.toggle("text-white")
    overlay.classList.toggle("opacity-100")
}

menuBtn.addEventListener("click", toggleMenu)

// Close menu on outside click
document.addEventListener("click", (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnMenuBtn = menuBtn.contains(e.target);

    if (!isClickInsideMenu && !isClickOnMenuBtn && menuBtn.getAttribute("aria-expanded") === "true") {
        toggleMenu();
    }
})

// *********** carousel logic *************


// loop over the navigation buttons
carouselButtons.forEach(button => {

    // add event listener to each
    button.addEventListener("click", () => {
        // If next, set const offset to 1 else -1
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        // get the active slide
        const activeSlide = slides.querySelector("[data-active]")

        // get the new index -> converting slides into an array -> get index of active slide + offset
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        console.log("newindex", newIndex)

        // Looping - first and last case

        // If navigating to the previous of first slide - navigate to the last
        // --> if new index is < 0 -> set the newIndex to be of slides / slidecontainer's lenght

        if (newIndex < 0) newIndex = slides.children.length - 1;

        // If navigating to the next of last slide, navigate to the first
        //--> If new index >= slides.length -> newIndex = 0

        if (newIndex >= slides.children.length) newIndex = 0;

        // Adding and removing aria-hidden
        activeSlide.setAttribute("aria-hidden", true)
        slides.children[newIndex].setAttribute("aria-hidden", true)

        // Set the child of slides / slidecontainer at the newIndex to be data-active='true'
        slides.children[newIndex].dataset.active = true;
        // Remove data-active from the current slide
        delete activeSlide.dataset.active;

    })

});