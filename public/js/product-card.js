// Definir el custom element
class ProductCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    static get observedAttributes() {
      return ['src', 'title', 'pharmacy', 'price', 'href'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    render() {
      const src = this.getAttribute('src');
      const title = this.getAttribute('title');
      const pharmacy = this.getAttribute('pharmacy');
      const price = this.getAttribute('price');
      const href = this.getAttribute('href');
  
      const template = `
        <article class="card">
          <img src="${src}" alt="${title}" />
          <h1>${title}</h1>
          <h2>${pharmacy}</h2>
          <h2>${price}</h2>
          <a href="${href}" target="_blank">Lo quiero</a>
        </article>
      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  // Exportar el custom element
  export default ProductCard;