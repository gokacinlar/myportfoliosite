class DoHeader extends HTMLElement {
    constructor() {
        super();
        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
		<style>
        @import url(assets/css/index.css);
        </style>
        <header>
        <a href="index.html" class="header-text">Derviş Öksüzoğlu</a>
        <section class="header-right">
            <ul class="header-right-navigation">
                <li><a href="index.html"><i class="bi bi-house-door"></i>
                        Anasayfa</a></li>
                <li><a href="blog.html"><i class="bi bi-journals"></i>
                        Blog</a></li>
                <li><a href="projects.html"><i class="bi bi-boxes"></i>Projeler</a></li>
                <li><a href="araclar.html"><i class="bi bi-gear"></i>Araçlar</a></li>
                <li><a href="about.html"><i class="bi bi-person"></i>
                        Hakkımda</a></li>
            </ul>
        </section>
        <section class="header-dropdown">
            <button class="dropbtn" onclick="dropDownFunction()" title="Menü">
                <i class="bi bi-list"></i>
            </button>
            <div class="dropdown-content" id="dropdown">
                <ul class="header-right-navigation">
                    <li><a href="index.html"><i class="bi bi-house-door"></i>
                            Anasayfa</a></li>
                    <li><a href="blog.html"><i class="bi bi-journals"></i>
                            Blog</a></li>
                    <li><a href="projects.html"><i class="bi bi-boxes"></i>Projeler</a></li>
                    <li><a href="araclar.html"><i class="bi bi-gear"></i>Araçlar</a></li>
                    <li><a href="about.html"><i class="bi bi-person"></i>
                            Hakkımda</a></li>
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
        const links = this.shadowRoot.querySelectorAll('.header-right-navigation a');
        links.forEach(link => {
            // absolute URL
            const linkUrl = new URL(link.href);
            // URL fragment with query parameters
            const windowUrl = new URL(window.location.href);
            // compare the pathname of link URL and windows URL
            /**
             * The pathname is the path section of the URL
             */
            if (linkUrl.pathname === windowUrl.pathname) {
                // if the pathnames are the same add the active class
                link.classList.add('active');
            }
        });
    }

}

customElements.define("do-header", DoHeader);