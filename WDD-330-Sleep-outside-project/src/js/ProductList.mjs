// src/js/ProductList.mjs
import ProductData from "./ProductData.mjs";

function normalizePath(p) {
  // turn "../images/..." or "./images/..." into "/images/..."
  return (p || "").replace(/^(\.\.\/|\.\/)/, "/");
}

function productCardTemplate(p) {
  const name = p.Name || p.name || "Unnamed";
  const img =
    normalizePath(p.Image || p.image) || "/images/logos/noun_Tent_2517.svg";
  const price = p.FinalPrice ?? p.finalPrice ?? p.price ?? "";
  const desc = p.Description || p.description || "";

  return `
    <li class="product-card">
      <a class="product__link" href="product_pages/?product=${p.Id}">
        <img src="${img}" alt="${name}" loading="lazy" />
        <h3 class="card__name">${name}</h3>
        ${price !== "" ? `<p class="card__price">$${price}</p>` : ""}
        ${desc ? `<p class="desc">${desc}</p>` : ""}
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource || new ProductData(category);
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      if (!Array.isArray(products))
        throw new Error("Products data is not an array");
      const html = products.map(productCardTemplate).join("");
      this.listElement.innerHTML = html;
    } catch (err) {
      console.error("Failed to render product list:", err);
      this.listElement.innerHTML = `<li>Unable to load products.</li>`;
    }
  }
}
