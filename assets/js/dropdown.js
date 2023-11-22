// header dropdown

function myFunction() {
    document.getElementById("dropdown").classList.toggle("show");
    var icon = document.querySelector('.header-dropdown .bi');
    icon.classList.add('transition');
    if (icon.classList.contains('bi-list')) {
        icon.classList.replace('bi-list', 'bi-x');
    } else {
        icon.classList.replace('bi-x', 'bi-list');
    }
    if (icon.classList.containes('bi-x')) {
        icon.style.fontSize = '3rem';
    } else {
        icon.style.fontSize = "1rem";
    }
    setTimeout(function () {
        icon.classList.remove('transition');
    }, 2500);
}

window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

// nav dropdown

const menuIcon = document.getElementById("menu-icon");
const navRight = document.getElementById("nav-right");

menuIcon.addEventListener("click", toggleNav);

function toggleNav() {
    navRight.classList.toggle("show");
}