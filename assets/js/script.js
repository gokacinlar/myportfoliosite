if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("Karanlık mod tercihi algılandı, karanlık moda geçildi.")
}

/**
 * Collapsible Content
 */

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        const content = this.nextElementSibling;
        const icon = this.querySelector(".bi-chevron-down");
        icon.classList.toggle("rotate");

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    /**
     * Topics Dropdown
     */

    const menuIcon = document.getElementById("menu-icon");
    const navRight = document.getElementById("nav-right");

    menuIcon.addEventListener("click", toggleNav);

    function toggleNav() {
        navRight.classList.toggle("show");
    }


    /**
     * Progress Bar Indicator
     */

    window.onscroll = () => {
        pBarFunc();
        scrollFunction();
    };

    const pBarFunc = () => {
        let progressBar = document.getElementById("myBar");
        let winScroll = window.scrollY || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    }

    /**
     * Scroll to Top Button
     */

    const scrollToTopBtn = document.getElementById("scrollTopBtn");

    const scrollFunction = () => {
        // check if scroll position is bigger than viewport's initial height
        if (window.pageYOffset > window.innerHeight) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    const topFunction = () => {
        document.body.scrollTop = 0; // scroll function for Safari
        document.documentElement.scrollTop = 0; // scroll function for Chromium-based browsers & Firefox
    }

    scrollToTopBtn.addEventListener("click", topFunction);
});