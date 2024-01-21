var navButtons = document.querySelectorAll(".navBtn");
navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var pageName = this.getAttribute("data-page");
        openPage(pageName);

        // Hide the tool-nav-desc section when a button is clicked
        document.querySelector('.tool-nav-desc').style.display = "none";
    });
});

function openPage(pageName) {
    var i, tabcontent, tabNavigation;
    tabcontent = document.getElementsByClassName("nav-page");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabNavigation = document.querySelectorAll(".navBtn");
    tabNavigation.forEach(function (button) {
        button.classList.remove("active");
    });
    document.getElementById(pageName).style.display = "block";
    document.querySelector('.navBtn[data-page="' + pageName + '"]').classList.add("active");
}

document.addEventListener('DOMContentLoaded', function () {
    var list = document.getElementById('toDoList');

    document.getElementById('addToDo').addEventListener('click', function () {
        newElement();
    });

    document.getElementById('myInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            newElement();
        }
    });

    list.addEventListener('click', function (ev) {
        if (ev.target.classList.contains('close')) {
            var listItem = ev.target.parentElement;
            listItem.style.display = "none";
        }
    });

    function newElement() {
        var inputValue = document.getElementById("myInput").value;
        if (inputValue.trim() === '') {
            alert("Listeye bir şeyler eklemeniz gerekiyor!");
        } else {
            var li = document.createElement("li");
            li.className = "td-item";
            li.innerHTML = inputValue + '<span class="close bi bi-x-circle"></span>';
            var list = document.getElementById("toDoList");
            var existingItems = list.querySelectorAll('.td-item');
            var captureBtn = document.getElementById("captureBtn");
            if (existingItems.length === 0) {
                li.style.borderTopRightRadius = "18px";
                li.style.borderTopLeftRadius = "18px";
                captureBtn.style.display = "none";
            } else if (existingItems.length === 1) {
                captureBtn.style.display = "inline-block";
            } else {
                li.style.borderTopRightRadius = "0px";
                li.style.borderTopLeftRadius = "0px";
            }
            list.appendChild(li);
            var closeBtn = li.querySelector('.bi-x-circle');
            closeBtn.addEventListener('click', function () {
                li.style.display = "none";
            });
        }
        document.getElementById("myInput").value = "";
    }
});