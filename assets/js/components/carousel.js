class DoCarousel extends HTMLElement {
    constructor() {
        super();

        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
        <style>
            @import url(assets/css/index.css);
        </style>
        <section class="projects">
            <div class="projects-top global-separators-w-topic">
                <hr>
                <h2>Projeler</h2>
                <hr>
            </div>
            <div class="carousel">
                <div class="slides">
                    <img class="lazyload slide-item" src="assets/img/main/carousel-loading.gif" alt="Loading Gif"
                        loading="lazy">
                    <img class="lazyload slide-item" src="assets/img/main/carousel-loading.gif" alt="Loading Gif"
                        loading="lazy">
                    <img class="lazyload slide-item" src="assets/img/main/carousel-loading.gif" alt="Loading Gif"
                        loading="lazy">
                </div>
                <button id="prevBtn" class="prev" title="Geri" aria-label="Geri"><i class="bi bi-arrow-left-circle"></i></button>
                <button id="nextBtn" class="next" title="İleri" aria-label="İleri"><i class="bi bi-arrow-right-circle"></i></button>
                <div class="indicators">
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                </div>
            </div>
        </section>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        // index of slide images
        let slideIndex = 0;
        let slideItems = this.shadowRoot.querySelectorAll(".slide-item");
        let indicators = this.shadowRoot.querySelectorAll(".indicator");

        // function to showslide one-by-one
        const showSlide = (index) => {
            const slides = this.shadowRoot.querySelector(".slides");
            const slideWidth = this.shadowRoot.querySelector(".slide-item").clientWidth;
            slides.style.transform = `translateX(-${index * slideWidth}px)`;
            // add function to upgrade indicators style based on slide index
            updateIndicators(index);
        };

        const nextSlide = () => {
            slideIndex = (slideIndex + 1) % slideItems.length;
            showSlide(slideIndex);
        };

        const prevSlide = () => {
            slideIndex = (slideIndex - 1 + slideItems.length) % slideItems.length;
            showSlide(slideIndex);
        };

        const updateIndicators = (index) => {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle("active", i === index);
            });
        };

        const goToSlide = (index) => {
            showSlide(index);
        };

        // forEach for indicator items to change style based upon slide change
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                goToSlide(index);
            });
        });

        this.prevBtn = this.shadowRoot.getElementById("prevBtn").addEventListener("click", prevSlide);
        this.nextBtn = this.shadowRoot.getElementById("nextBtn").addEventListener("click", nextSlide);
    }
}

customElements.define("do-carousel", DoCarousel);