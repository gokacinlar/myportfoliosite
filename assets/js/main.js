// My Porftolio Site's footer web component

class DoFooter extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = `
		<style>
		@import url(assets/css/index.css);
		</style>
		<footer>
			<section class="footer-top">
				<article class="footer-top-left">
					<picture class="responsive-img">
						<source srcset="assets/img/main/res/myself-small.webp" media="(max-width: 300px)">
						<source srcset="assets/img/main/res/myself-medium.webp" media="(max-width: 768px)">
						<img class="lazyload" src="assets/img/main/myself.webp" alt="Derviş Öksüzoğlu">
					</picture>
					<h2>Derviş Öksüzoğlu</h2>
				</article>
				<hr>
				<article class="footer-top-right">
					<section class="ftr-links">
						<a rel="noopener" href="https://www.linkedin.com/in/dervisoksuzoglu/" target="_blank"><i
								class="bi bi-linkedin" title="LinkedIn"></i></a>
						<a rel="noopener" href="https://www.github.com/gokacinlar/" target="_blank" title="GitHub"><i
								class="bi bi-github"></i></a>
					</section>
					<img class="lazyload" src="assets/img/main/notbyai/Produced-By-Human-Not-By-AI-Badge-white.png"
						alt="İnsan Üretimi, YZ değil.">
				</article>
			</section>
			<section class="footer-bottom">
				<p>Bu sitedeki tüm materyaller ve kaynaklar, <span class="footer-link-bottom">CC0 1.0 Evrensel
						Lisansı</span> kapsamında lisanslanmıştır;
					tekrardan dağıtılabilir, değiştirilebilir ve hatta para ile satılabilir. Detaylı bilgi için
					<span class="footer-link-bottom"><a rel="noopener"
							href="https://creativecommons.org/publicdomain/zero/1.0/deed.tr"
							target="_blank">tıklayın</a></span>.
				</p>
			</section>
		</footer>
		`;

		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("do-footer", DoFooter);