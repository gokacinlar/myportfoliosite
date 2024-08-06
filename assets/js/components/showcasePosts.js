class DoShowcasePost extends HTMLElement {
    constructor() {
        super();
        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
        <style>
            @import url(assets/css/index.css);
        </style>
        <section id="showCasePosts" class="posts-content-container">
        </section>
        `;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }

    async connectedCallback() {
        const jsonPath = "/assets/json/posts.json";
        let jsonData = null;

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

        const postsWrapper = this.shadowRoot.getElementById("showCasePosts");

        $(this.shadowRoot.document).ready(function () {
            appendPostData(jsonData.posts);
        })

        function appendPostData(posts) {
            posts.forEach(post => {
                const loader = $("<div>").prop({ className: "loader" });

                const imageWrapper = $("<div>", { class: "post-image-wrapper" })
                    .append(loader)
                    .append(
                        $("<a>", { href: post.link, title: post.name, target: "_blank" })
                            .attr("class", "post-project-link")
                            .append($("<picture>")
                                .append(
                                    $("<img>", {
                                        src: post.thumbnail,
                                        alt: `${post.name} Image`
                                    }).on("load", function () {
                                        loader.remove();
                                    })
                                )
                            )
                    );

                $("<div>", { class: "post-content" })
                    .append(
                        $("<div>", { class: "post-information" })
                            .append(
                                $("<h1>").text(post.name),
                                $("<p>").text(post.desc),
                                $("<a>", { href: post.link, text: "Gönderiye Git", target: "_blank" })
                                    .attr("class", "post-project-link")
                            ),
                        imageWrapper
                    )
                    .hide()
                    .appendTo(postsWrapper)
                    .fadeIn(1000);
            });
        }
    }
}

customElements.define("do-showcase-posts", DoShowcasePost);