// dom to manipulate the tabs

var navButtons = document.querySelectorAll(".navBtn");
navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var pageName = this.getAttribute("data-page");
        openPage(pageName);
        document.querySelector(".tool-nav-desc").style.display = "none";
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
    document
        .querySelector('.navBtn[data-page="' + pageName + '"]')
        .classList.add("active");
}

// buttons to navigate through the tabs-navigation

let scrollLeftBtn = document.getElementById("tnPrevBtn");
let scrollRightBtn = document.getElementById("tnNextBtn");
let tabsNavigation = document.querySelector(".tabs-navigation > ul");

scrollLeftBtn.addEventListener("click", function () {
    tabsNavigation.scrollLeft -= 1000;
});

scrollRightBtn.addEventListener("click", function () {
    tabsNavigation.scrollLeft += 1000;
});

document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("toDoList");

    document.getElementById("addToDo").addEventListener("click", function () {
        newElement();
    });

    document
        .getElementById("myInput")
        .addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                newElement();
            }
        });

    list.addEventListener("click", function (ev) {
        if (ev.target.classList.contains("close")) {
            var listItem = ev.target.parentElement;
            listItem.style.display = "none";
        }
    });

    function newElement() {
        var inputValue = document.getElementById("myInput").value;
        if (inputValue.trim() === "") {
            alert("Listeye bir şeyler eklemeniz gerekiyor!");
        } else {
            var li = document.createElement("li");
            li.className = "td-item";
            li.innerHTML = inputValue + '<span class="close bi bi-x-circle"></span>';
            var list = document.getElementById("toDoList");
            var existingItems = list.querySelectorAll(".td-item");
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
            var closeBtn = li.querySelector(".bi-x-circle");
            closeBtn.addEventListener("click", function () {
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
    document.getElementById("nativeClock").innerText =
        h + ":" + m + ":" + s + " " + meridyen;
    setTimeout(clockTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
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
});

document.getElementById("swStop").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("swReset").addEventListener("click", () => {
    clearInterval(int);
    [seconds, minutes, hours] = [0, 0, 0];
    stopWatch.innerText = "00:00:00";
});

function stopWatchTimer() {
    seconds += 1;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    stopWatch.innerText = `${h} : ${m} : ${s}`;
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
    countResult.innerText = count;

    if (str.length === 0) {
        countResult.innerText = 0;
    }
});

wcResetBtn.addEventListener("click", () => {
    wcArea.value = "";
    countResult.innerText = "0";
    countResult.classList.add("wc-result-animate");
    setTimeout(() => {
        countResult.classList.remove("wc-result-animate");
    }, 250);
});

// unit converter

const inputField = document.querySelector("input[name='First Input']");
const outputTextarea = document.getElementById("ucOutputValue");
const convertBtn = document.getElementById("ucConvertBtn");
const valueOneSelect = document.getElementById("ucValueOne");
const valueTwoSelect = document.getElementById("ucValueTwo");

function addSpacesToBinary(binaryString, spacing) {
    let formattedString = "";
    for (let i = 0; i < binaryString.length; i++) {
        formattedString += binaryString[i];
        if ((i + 1) % spacing === 0 && i !== binaryString.length - 1) {
            formattedString += " ";
        }
    }
    return formattedString;
}

convertBtn.addEventListener("click", () => {
    const inputValue = inputField.value.trim();
    const fromUnit = valueOneSelect.value;
    const toUnit = valueTwoSelect.value;

    let convertedValue;

    if (fromUnit === "İkilik" && toUnit === "Ondalık") {
        convertedValue = parseInt(inputValue, 2).toString(10);
    } else if (fromUnit === "İkilik" && toUnit === "Sekizlik") {
        convertedValue = parseInt(inputValue, 2).toString(8);
    } else if (fromUnit === "İkilik" && toUnit === "Onaltılık") {
        convertedValue = parseInt(inputValue, 2).toString(16).toUpperCase();
    } else if (fromUnit === "Ondalık" && toUnit === "İkilik") {
        convertedValue = parseInt(inputValue, 10).toString(2);
    } else if (fromUnit === "Ondalık" && toUnit === "Sekizlik") {
        convertedValue = parseInt(inputValue, 10).toString(8);
    } else if (fromUnit === "Ondalık" && toUnit === "Onaltılık") {
        convertedValue = parseInt(inputValue, 10).toString(16).toUpperCase();
    } else if (fromUnit === "Sekizlik" && toUnit === "İkilik") {
        convertedValue = parseInt(inputValue, 8).toString(2);
    } else if (fromUnit === "Sekizlik" && toUnit === "Ondalık") {
        convertedValue = parseInt(inputValue, 8).toString(10);
    } else if (fromUnit === "Sekizlik" && toUnit === "Onaltılık") {
        convertedValue = parseInt(inputValue, 8).toString(16).toUpperCase();
    } else if (fromUnit === "Onaltılık" && toUnit === "İkilik") {
        convertedValue = parseInt(inputValue, 16).toString(2);
    } else if (fromUnit === "Onaltılık" && toUnit === "Ondalık") {
        convertedValue = parseInt(inputValue, 16).toString(10);
    } else if (fromUnit === "Onaltılık" && toUnit === "Sekizlik") {
        convertedValue = parseInt(inputValue, 16).toString(8);
    } else {
        convertedValue = "Geçersiz birim dönüşümü!";
    }

    outputTextarea.value = convertedValue;
});

// wysiwyg blog post editor

let textValue = "";

let classObject = {
    h1ClassName: "article-title",
    h2ClassName: "article-h2-title",
    h3ClassName: "article-h3-title",
    pClassName: "article-paragraph",
    aClassName: "am-in-link",
    imgClassName: "am-in-img",
    codeClass: "am-in-code",
    uListClass: "u-list", // later define
    oListClass: "o-list", // later define
};

let formatters = {
    boldFormatter: "boldFormatter",
    italicFormatter: "italicFormatter",
    underlineFormatter: "underlineFormatter",
};

const syncElements = document.querySelectorAll(".syncText");

// add event listeners to all syncElements to reflect input text in both areas
for (const element of syncElements) {
    element.addEventListener("change", reflectText);
    element.addEventListener("input", reflectText);
    element.addEventListener("keyup", reflectText);
}

function reflectText(e) {
    const textValue = e.target.value;

    for (const element of syncElements) {
        if (element.tagName === "TEXTAREA") {
            element.value = textValue;
        } else if (element.tagName === "DIV") {
            element.innerHTML = textValue;
        }
    }
}

// experimental feature to add and format to text on cursor position
// example: insertTextOnCursor(inputTextArea, h1OutPut);

/*

function insertTextOnCursor(inputTextArea, textToBeInserted) {
    var cursorPosition = inputTextArea.selectionStart;
    var textBefore = inputTextArea.value.substring(0, cursorPosition);
    var textAfter = inputTextArea.value.substring(inputTextArea.selectionEnd, inputTextArea.value.length);
    inputTextArea.value = textBefore + textToBeInserted + textAfter;
}

*/

let inputTextArea = document.getElementById("weInputArea");
let outputDiv = document.getElementById("weOutputArea");

// function to prevent tab press to insert "undefined" at textarea
// temporary solution

inputTextArea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        e.preventDefault(); // prevent default tab behaviour
    }
});

// styling to make buttons' border radius 44px with smaller characters than 3

const weEditorButtons = document.querySelectorAll(".we-btn");

weEditorButtons.forEach((button) => {
    const buttonText = button.innerText;
    const buttonCharCount = buttonText.length;

    if (buttonCharCount <= 3) {
        button.style.borderRadius = "44px";
    }
});

// function to copy the html editors' content

let weCopyBtn = document.getElementById("weCopy");

weCopyBtn.addEventListener("click", () => {
    if (inputTextArea.value === "") {
        alert("Kopyalanacak bir öğe yok.");
        return null;
    }
    inputTextArea.select();
    inputTextArea.execCommand("copy");
});

/*
    Button functions to add pre-defined HTML elements with custom
    CSS styling of mine. Styling can be changed within the "classObject"
    property but has to be defined in the article.css file specifically.
*/

h1Title.addEventListener("click", function () {
    var h1Output = `<h1 class="${classObject.h1ClassName}">H1 Title</h1>\n`;
    outputDiv.innerText += h1Output;
    inputTextArea.value += h1Output;
    reflectText({ target: inputTextArea });
});

h2Title.addEventListener("click", function () {
    var h2Output = `<h2 class="${classObject.h2ClassName}">H2 Title</h2>\n`;
    outputDiv.innerText += h2Output;
    inputTextArea.value += h2Output;
    reflectText({ target: inputTextArea });
});

h3Title.addEventListener("click", function () {
    var h3Output = `<h3 class="${classObject.h3ClassName}">H3 Title</h3>\n`;
    outputDiv.innerText += h3Output;
    inputTextArea.value += h3Output;
    reflectText({ target: inputTextArea });
});

loremIpsum.addEventListener("click", function () {
    var pOutput = `<p class="${classObject.pClassName}">Paragraph</p>\n`;
    outputDiv.innerText += pOutput;
    inputTextArea.value += pOutput;
    reflectText({ target: inputTextArea });
});

anchorLink.addEventListener("click", function () {
    var aOutPut = `<a class="${classObject.aClassName}">Link</a>`;
    outputDiv.innerText += aOutPut;
    inputTextArea.value += aOutPut;
    reflectText({ target: inputTextArea });
});

imageLink.addEventListener("click", function () {
    var imgOutPut = `<img class="${classObject.imgClassName}" src="assets/img/content" alt="" title="">`;
    outputDiv.innerText + imgOutPut;
    inputTextArea.value += imgOutPut;
    reflectText({ target: inputTextArea });
});

embedCode.addEventListener("click", function () {
    var codeOutPut = `<code class="${classObject.codeClass} language-*insert language*">Your code here...</code>`;
    outputDiv.innerText + codeOutPut;
    inputTextArea.value += codeOutPut;
    reflectText({ target: inputTextArea });
});

uList.addEventListener("click", function () {
    var unorderedListOutPut = `<ul class="${classObject.uListClass}">
    <li></li>
    <li></li>
</ul>
`;
    outputDiv.innerText + unorderedListOutPut;
    inputTextArea.value += unorderedListOutPut;
    reflectText({ target: inputTextArea });
});

oList.addEventListener("click", function () {
    var orderedListOutPut = `<ol class="${classObject.oListClass}">
    <li></li>
    <li></li>
</ol>
`;
    outputDiv.innerText + orderedListOutPut;
    inputTextArea.value += orderedListOutPut;
    reflectText({ target: inputTextArea });
});

// function to update the code based on the typed language using prism.js library
function updateCodeLanguage(language) {
    const codeElement = document.querySelector("code." + classObject.codeClass); // target the code element using prism.js
    if (codeElement) {
        codeElement.classList.remove("language-*"); // remove previous language class
        codeElement.classList.add("language-" + language); // add the new language class
    }
}

inputTextArea.addEventListener("keyup", function (event) {
    const typedText = event.target.value;

    // extract the typed language
    const languageMatch = typedText.match(/(\w+)$/); // regex
    const language = languageMatch ? languageMatch[1].toLowerCase() : ""; // Get the language or an empty string

    // update the code element's language class
    updateCodeLanguage(language);
});

// function to format selected text (experimental)

/*

function formatText() {

    // get the text
    const selectedText = inputTextArea.value.substring(
        inputTextArea.selectionStart,
        inputTextArea.selectionEnd
    );

    // format the text

    const formattedText = boldFormatter.addEventListener("click", () => {

    });
}

*/

// function to check if sections of tabs-navigation has child elements
// if not, add placeHolderDiv indication of "under construction"

document.addEventListener("DOMContentLoaded", function () {
    let tabsContent = document.getElementById("hasChild");

    if (!tabsContent.children.length) {
        const placeHolderDiv = document.createElement("DIV");
        placeHolderDiv.setAttribute("class", "placeholder-div");
        // Combine text and extra element using another template literal
        placeHolderDiv.innerHTML = `Yapım Aşamasında... <i class="bi bi-robot"></i>`;
        tabsContent.appendChild(placeHolderDiv);
    }
});


/**
 * META TAGS GENERATOR
 * GENERATE META TAGS WITH ONE CLICK
 */

const userTagInputs = {
    generalInputs: {
        mtauthor: "mtgmAuthor",
        mtowner: "mtgmOwner",
        mtdesc: "mtgmDesc",
        mtrobots: "mtgmRobots"
    },
    openGraphInputs: {
        ogtitle: "mtgogTitle",
        ogdesc: "mtgogDesc",
        ogUrl: "mtgogUrl",
        ogimgurl: "mtgogImg",
        ogimgalt: "mtgogImgAlt",
        ogtype: "mtgogType",
        oglocale: "mtgogLocale",
        ogSiteName: "mtgogSiteName"
    },
    twitterXInputs: {
        xcard: "mttXCard",
        xtitle: "mttXTitle",
        xdesc: "mttXDesc",
        xurl: "mttXUrl",
        ximg: "mttXImg",
        ximgalt: "mttXImgAlt"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const mtgContainer = document.getElementById("mtgContainer");
    const mtSubmitBtn = document.getElementById("mtSubmit");

    // error handling
    if (!mtgContainer || !mtSubmitBtn) {
        console.error("Gerekli ögeler bulunamadı.");
        return;
    }

    mtSubmitBtn.addEventListener("click", (event) => {
        // get the values values using object & key method
        // get the main input 
        const gInputs = Object.keys(userTagInputs.generalInputs).map(key => {
            const element = document.getElementById(userTagInputs.generalInputs[key]);
            return element ? element.value : null;
        });

        // get the open graph
        const ogInputs = Object.keys(userTagInputs.openGraphInputs).map(key => {
            const element = document.getElementById(userTagInputs.openGraphInputs[key]);
            return element ? element.value : null;
        });

        // get the x card
        const xInputs = Object.keys(userTagInputs.twitterXInputs).map(key => {
            const element = document.getElementById(userTagInputs.twitterXInputs[key]);
            return element ? element.value : null;
        });

        // check if input fields are empty by checking the existence of an element by using "some" method
        if ((gInputs.some(input => input === "") || ogInputs.some(input => input === "")) || xInputs.some(input => input === "")) {
            alert("Lütfen tüm alanları doldurun.");
            event.preventDefault();
            return;
        }

        // create the output
        let checkTextArea = document.getElementById("mtgTextArea");
        if (!checkTextArea) {
            let mtgTextArea = document.createElement("textarea");
            mtgTextArea.classList.add("mtg-textarea");
            mtgTextArea.id = "mtgTextArea";

            // set the user input with wrapping them inside meta tags 
            mtgTextArea.value = `<!--General Meta Tags-->
<meta name="author" content="${gInputs[0]}">
<meta name="owner" content="${gInputs[1]}">
<meta name="description" content="${gInputs[2]}">
<meta name="robots" content="${gInputs[3]}">\n

<!--Open Graph Meta Tags-->
<meta property="og:title" content="${ogInputs[0]}">
<meta property="og:description" content="${ogInputs[1]}">
<meta property="og:url" content="${ogInputs[2]}">
<meta property="og:image" content="${ogInputs[3]}">
<meta property="og:image:alt" content="${ogInputs[4]}">
<meta property="og:type" content="${ogInputs[5]}">
<meta property="og:locale" content="${ogInputs[6]}">
<meta property="og:site-name" content="${ogInputs[7]}">

<!--Twitter/X Tags-->
<meta name="twitter:card" content="${xInputs[0]}">
<meta name="twitter:title" content="${xInputs[1]}">
<meta name="twitter:description" content="${xInputs[2]}">
<meta name="twitter:image" content="${xInputs[3]}">
<meta name="twitter:image:alt" content="${xInputs[4]}">
`;

            mtgContainer.appendChild(mtgTextArea);

            let mtgRefreshBtn = document.createElement("button");
            mtgRefreshBtn.classList.add("mtg-refresh-btn");
            mtgRefreshBtn.innerHTML = `Yenile <i class="bi bi-arrow-clockwise"></i>`;
            mtgContainer.appendChild(mtgRefreshBtn);

            mtgRefreshBtn.addEventListener("click", (event) => {
                mtgTextArea.remove();
                mtgRefreshBtn.remove();
            });

        } else {
            event.preventDefault();
        }
    });
});