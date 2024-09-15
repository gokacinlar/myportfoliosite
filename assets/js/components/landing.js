class DoLandingSection extends HTMLElement {
    constructor() {
        super();

        // Define static informations
        this.classNames = {
            mainSection: "main-landing",
            mainLeft: "main-landing-left",
            mainRight: "main-landing-right",
            mainH1: "main-landing-title",
            mainH2: "main-landing-subtitle",
            mainP: "main-landing-mottos",
            mainBackground: "main-landing-bg-gradient",
            mainBgImage: "responsive-img",
            mainImgMyself: "main-landing-img-myself",
            mainRedirect: "main-landing-redirect"
        }

        this.ids = {
            mainMottos: "mottos",
        }

        this.paths = {
            img: "assets/img/main/myself.webp",
            imgSmall: "assets/img/main/res/myself-small.webp",
            imgMed: "assets/img/main/res/myself-medium.webp",
            redirect: "about.html"
        }

        this.mottos = [
            "İlerici",
            "Modern",
            "Gerçekçi",
            "Problem Çözücü",
            "Pratik"
        ];

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
    }

    createTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                @import url(assets/css/index.css);
            </style>
            <section class="${this.classNames.mainSection}">
                ${this.renderBackground()}
            </section>
        `;
        return template;
    }

    renderBackground() {
        return `
            <div class="${this.classNames.mainBackground}">
                ${this.renderLandingLeft()}
                ${this.renderlandingRight()}
            </div>
        `;
    }

    renderLandingLeft() {
        return `
        <div class="${this.classNames.mainLeft}">
            <h1 class="${this.classNames.mainH1}">Derviş Öksüzoğlu</h1>
            <h2 class="${this.classNames.mainH2}">İngilizce Öğretmeni & Front-end Web Geliştiricisi</h2>
            <div class="${this.classNames.mainP}" id="${this.ids.mainMottos}"></div>
        </div>
        `;
    }

    renderlandingRight() {
        return `
        <div class="${this.classNames.mainRight}">
            <picture class="${this.classNames.mainBgImage}">
                <source srcset="${this.paths.imgSmall}" media="(max-width: 300px)">
                <source srcset="${this.paths.imgMed}" media="(max-width: 768px)">
                <img src="${this.paths.img}" class="${this.classNames.mainImgMyself}" alt="Derviş Öksüzoğlu">
            </picture>
        </div>
        `;
    }

    // Function to append mottos into DOM with sequential order
    async appendContent(target, content) {
        for (let i in content) {
            let p = document.createElement("p");
            p.textContent = content[i];
            // Use promise-resolve to sequentially place the array items into dom
            await new Promise(resolve => {
                setTimeout(() => {
                    target.appendChild(p);
                    resolve();
                }, 1000);
            });
        }
    }

    connectedCallback() {
        addEventListener("DOMContentLoaded", () => {
            const mottosElement = this.shadowRoot.querySelector("#mottos");
            this.appendContent(mottosElement, this.mottos).then(() => {

                // After all mottos are appended, apply the scale-up effect sequentially
                const paragraphs = this.shadowRoot.querySelectorAll(".main-landing-mottos > p");
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.classList.add("scale-up");
                        setTimeout(() => {
                            p.classList.remove("scale-up");
                        }, 1000);
                    }, index * 2000);
                });
            });
        });
    }
}

customElements.define("do-landing", DoLandingSection);