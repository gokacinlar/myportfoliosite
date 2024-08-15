class DoHeader extends HTMLElement {
    constructor() {
        super();
        const documentTemplate = document.createElement("template");
        const hrefLinks = {
            homepage: "index.html",
            about: "about.html",
            tools: "araclar.html",
            projects: "projects.html",
            blog: "https://blog.dervisoksuzoglu.net"
        }
        documentTemplate.innerHTML = `
		<style>
        @import url(assets/css/index.css);
        </style>
        <header>
        <a href="index.html" class="header-text">Derviş Öksüzoğlu</a>
        <section class="header-right">
            <ul class="header-right-navigation">
                <li><a href="${hrefLinks.homepage}"><i class="bi bi-house-door"></i>
                        Anasayfa</a></li>
                <li><a href="${hrefLinks.blog}"><i class="bi bi-journals"></i>
                        Blog</a></li>
                <li><a href="${hrefLinks.projects}l"><i class="bi bi-boxes"></i>Projeler</a></li>
                <li><a href="${hrefLinks.tools}"><i class="bi bi-gear"></i>Araçlar</a></li>
                <li><a href="${hrefLinks.about}"><i class="bi bi-person"></i>Hakkımda</a></li>
            </ul>
        </section>
        <section class="header-dropdown">
            <button class="dropbtn" title="Menü" id="dropDownButton">
                <i class="bi bi-list"></i>
            </button>
            <div class="dropdown-content" id="dropDownContent">
                <ul class="header-right-navigation">
                    <li><a href="${hrefLinks.homepage}"><i class="bi bi-house-door"></i>
                            Anasayfa</a></li>
                    <li><a href="${hrefLinks.blog}"><i class="bi bi-journals"></i>
                            Blog</a></li>
                    <li><a href="${hrefLinks.projects}l"><i class="bi bi-boxes"></i>Projeler</a></li>
                    <li><a href="${hrefLinks.tools}"><i class="bi bi-gear"></i>Araçlar</a></li>
                    <li><a href="${hrefLinks.about}"><i class="bi bi-person"></i>Hakkımda</a></li>
                </ul>
            </div>
        </section>
    </header>
	`;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }

    // dynamically add "active" classname to each page using connectedCallback & window method
    connectedCallback() {
        // get all the target tags in shadow root
        const links = this.shadowRoot.querySelectorAll(".header-right-navigation a");
        links.forEach(link => {
            // absolute URL
            const linkUrl = new URL(link.href);
            // URL fragment with query parameters
            const windowUrl = new URL(window.location.href);
            // compare the pathname of link URL and windows URL

            /**
             * The pathname is the path section of the URL
             */

            // Remove the .html extension from the pathname since .htacces removes the .html file extension from URLs
            const linkPathname = linkUrl.pathname.replace(".html", "");
            const windowPathname = windowUrl.pathname.replace(".html", "");

            if (linkPathname === windowPathname) {
                link.classList.add("active");
            }
        });

        // Dropdown functionality
        const dropdownButton = this.shadowRoot.getElementById("dropDownButton");
        dropdownButton.addEventListener("click", () => {
            const dropDownContent = this.shadowRoot.getElementById("dropDownContent");
            dropDownContent.classList.toggle("show");
            const icon = this.shadowRoot.querySelector(".header-dropdown .bi");
            if (icon.classList.contains("bi-list")) {
                icon.classList.replace("bi-list", "bi-x");
            } else {
                icon.classList.replace("bi-x", "bi-list");
            }
        });
    }
}

customElements.define("do-header", DoHeader);