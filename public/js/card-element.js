class CardElement extends HTMLElement {
    constructor() {
        super();

        // Crear un shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Crear el contenedor del template
        const wrapper = document.createElement('article');
        wrapper.classList.add('card');

        // Extraer atributos del elemento
        const imgSrc = this.getAttribute('img-src');
        const title = this.getAttribute('title');
        const pharmacy = this.getAttribute('pharmacy');
        const price = this.getAttribute('price');
        const link = this.getAttribute('link');

        // Definir el contenido del template
        wrapper.innerHTML = `
            <img src="${imgSrc}" alt="${title}" />
            <h1>${title}</h1>
            <h2>${pharmacy}</h2>
            <h2>${price}</h2>
            <a href="${link}" target="_blank">Lo quiero</a>
        `;

        // Aplicar estilos al shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                background-color: var(--chrysler-blue);
                aspect-ratio: 2/3;
                width: 100%;
                border-radius: 10px;
                margin: 10px;
                padding: 10px;
            }

            .card > * {
                position: relative;
            }

            .card img {
                position: relative;
                width: 100%;
                height: 60%;
                object-fit: cover;
                border-radius: 10px;
            }

            .card h1 {
                position: relative;
                font-size: 1.5em;
                color: var(--black);
            }

            .card h2 {
                position: relative;
                font-size: 1.2em;
                color: var(--black);
                margin-bottom: 20px;
            }

            .card a {
                padding: 5px;
                border: none;
                border-radius: 5px;
                background-color: var(--honolulu-blue);
                color: var(--black);
                cursor: pointer;
            }
        `;

        // Añadir los elementos al shadow root
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

// Registrar el custom element
customElements.define('card-element', CardElement);
