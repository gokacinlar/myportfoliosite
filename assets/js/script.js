document.addEventListener("DOMContentLoaded", function () {
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
});

// slide carousel

let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const slideWidth = document.querySelector('.slides img').clientWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
    updateIndicators(index);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slides img');
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slides img');
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

function goToSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
}

function updateIndicators(index) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

showSlide(slideIndex);

// nav dropdown

const menuIcon = document.getElementById("menu-icon");
const navRight = document.getElementById("nav-right");

menuIcon.addEventListener("click", toggleNav);

function toggleNav() {
    navRight.classList.toggle("show");
}

// progress bar

window.onscroll = function () {
    pBarFunc();
};

function pBarFunc() {
    var winScroll = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// header dropdown

function dropDownFunction() {
    document.getElementById("dropdown").classList.toggle("show");
    var icon = document.querySelector('.header-dropdown .bi');
    if (icon.classList.contains('bi-list')) {
        icon.classList.replace('bi-list', 'bi-x');
    } else {
        icon.classList.replace('bi-x', 'bi-list');
    }
}

window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

// scroll to top button

let mybutton = document.getElementById("scrollTopBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}