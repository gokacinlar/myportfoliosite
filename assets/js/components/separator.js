class DoSeparator extends HTMLElement {
    constructor() {
        super();
        const documentTemplate = document.createElement("template");
        documentTemplate.innerHTML = `
        <style>
            @import url(assets/css/index.css);
        </style>
        <div class="global-separators-w-topic">
            <h2></h2>
        </div>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(documentTemplate.content.cloneNode(true));
    }
    connectedCallback() {
        const h2Element = this.shadowRoot.querySelector("h2");
        // Assign the desired title in text attribute
        h2Element.textContent = this.getAttribute("text") || "Insert title here...";
    }
}

customElements.define("do-separator", DoSeparator);