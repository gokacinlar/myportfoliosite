class DoHeader extends HTMLElement {
    constructor() {
        super();
        this.hrefLinks = {
            homepage: "/index.html",
            about: "/about.html",
            tools: "/araclar.html",
            projects: "/projects.html",
            blog: "https://blog.dervisoksuzoglu.net"
        };

        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
            <style>
                @import url(assets/css/index.css);
            </style>
            ${this.renderHeader()}
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }

    renderHeader() {
        return `
            <header>
                <a href="index.html" class="header-text">Derviş Öksüzoğlu</a>
                ${this.renderHeaderFirst()}
                <section class="header-dropdown">
                    <button class="dropbtn" title="Menü" id="dropDownButton">
                        <i class="bi bi-list"></i>
                    </button>
                    ${this.renderHeaderSecond()}
                </section>
            </header>
        `
    }

    renderHeaderFirst() {
        return `
            <section class="header-right">
                <ul class="header-right-navigation">
                    <li><a href="${this.hrefLinks.homepage}"><i class="bi bi-house-door"></i>Anasayfa</a></li>
                    <li><a href="${this.hrefLinks.blog}"><i class="bi bi-journals"></i>Blog</a></li>
                    <li><a href="${this.hrefLinks.projects}"><i class="bi bi-boxes"></i>Projeler</a></li>
                    <li><a href="${this.hrefLinks.tools}"><i class="bi bi-gear"></i>Araçlar</a></li>
                    <li><a href="${this.hrefLinks.about}"><i class="bi bi-person"></i>Hakkımda</a></li>
                </ul>
            </section>
        `;
    }

    renderHeaderSecond() {
        return `
            <div class="dropdown-content" id="dropDownContent">
                <ul class="header-right-navigation">
                    <li><a href="${this.hrefLinks.homepage}"><i class="bi bi-house-door"></i>Anasayfa</a></li>
                    <li><a href="${this.hrefLinks.blog}"><i class="bi bi-journals"></i>Blog</a></li>
                    <li><a href="${this.hrefLinks.projects}"><i class="bi bi-boxes"></i>Projeler</a></li>
                    <li><a href="${this.hrefLinks.tools}"><i class="bi bi-gear"></i>Araçlar</a></li>
                    <li><a href="${this.hrefLinks.about}"><i class="bi bi-person"></i>Hakkımda</a></li>
                </ul>
            </div>
        `;
    }

    connectedCallback() {
        // Get all the target tags in shadow root
        const links = this.shadowRoot.querySelectorAll(".header-right-navigation a");
        links.forEach(link => {
            const linkUrl = new URL(link.href);
            const windowUrl = new URL(window.location.href);

            // Compare the pathname of link URL and window URL
            if (linkUrl.pathname === windowUrl.pathname) {
                link.classList.add("active");
                if (linkUrl.pathname === new URL(this.hrefLinks.blog).pathname) {
                    link.classList.remove("active");
                }
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