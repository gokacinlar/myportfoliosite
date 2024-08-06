class DoNavigationProjects extends HTMLElement {
    constructor() {
        super();
        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
        <style>
        @import url(assets/css/index.css);
        </style>
        <div class="pn-navigation-list">
            <ul class="pn-ul">
                <li>
                    <button id="addOns" class="pn-ul-link" title="Tarayıcı Eklentileri">Tarayıcı Eklentileri</button>
                </li>
            </ul>
        </div>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }

    async connectedCallback() {
        // Check the inital stage of JSON data and if it populated the DOM
        let isAddonsLoaded = false;
        let isWebsitesLoaded = false;

        const projectDocumentBody = document.getElementById("projectsContent")
        const buttonObj = {
            addons: this.shadowRoot.getElementById("addOns"),
            websites: this.shadowRoot.getElementById("websites")
        };

        /**
         * Fetch the JSON data
         */

        // Declare JSON path and inital value
        const jsonPath = "/assets/json/projects.json";
        let jsonData = null;

        // Use try-catch block with fetch API to get all the JSON data correctly
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            jsonData = await response.json();
        } catch (err) {
            console.error("Error retrieving JSON data:", err);
            return;
        }

        // Function to create and append project items to the website with animation
        // with used fetch api & JSON
        const appendExtensionProjects = (projects) => {
            projects.forEach(project => {
                const loader = $("<div>").prop({ className: "loader" });

                const imageWrapper = $("<div>", { class: "image-wrapper" })
                    .append(loader) // Append the loader
                    .append(
                        $("<img>", {
                            src: project.image,
                            alt: `${project.name} Image`
                        }).on("load", function () {
                            loader.remove(); // Remove the loader when the image has loaded
                        })
                    );

                $("<div>", { class: "info-div" })
                    .append(
                        $("<div>", { class: "text-wrapper" })
                            .append(
                                $("<h1>").text(project.name),
                                $("<p>").text(project.description),
                                $("<p>").text(`Kullanılan Dil(ler): ${project.type}`),
                                $("<a>", { href: project.link, text: "Proje Bağlantısı", target: "_blank" })
                                    .attr("class", "project-link")
                            ),
                        imageWrapper // Append the image wrapper here
                    )
                    .hide() // Hide the div initially so that animation could work
                    .appendTo(projectDocumentBody)
                    .fadeIn(1000); // Animate the div to fade in over 1 second
            });
        };


        // Add event listeners for buttons
        buttonObj.addons.addEventListener("click", function () {
            if (!isAddonsLoaded) {
                appendExtensionProjects(jsonData.addons);
                isAddonsLoaded = true; // Set the flag to true to prevent populating DOM again
            }
        });
    }
}

customElements.define("do-projects-navigation", DoNavigationProjects);