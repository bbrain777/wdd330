// src/js/ProductDetails.mjs
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    if (!this.productId) {
      // no id? go home
      window.location.href = "/index.html";
      return;
    }
    // 1) fetch details
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      this.renderError(`Product not found: ${this.productId}`);
      return;
    }
    // 2) render
    this.renderProductDetails();
    // 3) wire add-to-cart
    const btn = document.getElementById("addToCart");
    if (btn) btn.addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") ?? [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);

    const btn = document.getElementById("addToCart");
    if (btn) btn.textContent = "Added!";
  }

  renderError(msg) {
    const target = document.getElementById("product-details");
    if (target) target.innerHTML = `<p>${msg}</p>`;
  }

  renderProductDetails() {
    const p = this.product;
    const color = (p.Colors && p.Colors[0] && p.Colors[0].ColorName) || "";
    const desc = p.Description || "Enjoy the outdoors with this reliable tent.";

    const html = `
      <div class="product-detail__wrapper divider">
        <div class="product-detail__image">
          <img src="${p.Image}" alt="${p.Name}" />
        </div>
        <div class="product-detail__info">
          <h1 class="product__name">${p.Name}</h1>
          ${color ? `<p class="product__color">${color}</p>` : ``}
          <p class="product__price">$${p.FinalPrice}</p>
          <button id="addToCart" class="button primary" aria-label="Add ${p.Name} to cart">
            Add to Cart
          </button>
        </div>
      </div>
      <section class="product-detail__description">
        <h2>Product Details</h2>
        <p>${desc}</p>
      </section>
    `;
    const target = document.getElementById("product-details");
    if (target) target.innerHTML = html;
  }
}
