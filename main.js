const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

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