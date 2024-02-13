var navButtons = document.querySelectorAll(".navBtn");
navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var pageName = this.getAttribute("data-page");
        openPage(pageName);
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

// clock and stopwatch

function clockTime() {
    const clock = new Date();
    let h = clock.getHours();
    let m = clock.getMinutes();
    let s = clock.getSeconds();
    let meridyen = "ÖÖ" ? "ÖÖ" : "ÖS";
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('nativeClock').innerHTML = h + ":" + m + ":" + s + " " + meridyen;
    setTimeout(clockTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

let [seconds, minutes, hours] = [0, 0, 0];
let stopWatch = document.getElementById("stopWatch");
let int = null;

document.getElementById("swStart").addEventListener("click", () => {
    if (int != null) {
        clearInterval(int);
    }
    int = setInterval(stopWatchTimer, 10);
})

document.getElementById("swStop").addEventListener("click", () => {
    clearInterval(int);
})

document.getElementById("swReset").addEventListener("click", () => {
    clearInterval(int);
    [seconds, minutes, hours] = [0, 0, 0];
    stopWatch.innerHTML = "00:00:00";
})

function stopWatchTimer() {
    seconds += 1;
    if (seconds == 60) {
        seconds = 0;
        minutes++
    } if (minutes == 60) {
        minutes = 0;
        hours++;
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    stopWatch.innerHTML = `${h} : ${m} : ${s}`;
}

// word counter

let wcArea = document.getElementById("wcArea");
let wcBtn = document.getElementById("wcBtn");
let wcResetBtn = document.getElementById("wcBtnReset");
let countResult = document.getElementById("wcResultNumber");

wcBtn.addEventListener("click", function () {
    let str = wcArea.value.trim();
    let wordsList = str.split(/\s+/);
    let count = wordsList.length;
    countResult.innerHTML = count;

    if (str.length == 0) {
        countResult.innerHTML = 0;
    }
});

wcResetBtn.addEventListener("click", () => {
    wcArea.value = "";
    countResult.innerHTML = "0";
});