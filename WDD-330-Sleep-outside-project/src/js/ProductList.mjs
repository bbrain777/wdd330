import { renderListWithTemplate } from "./utils.mjs";

function normalizePath(p) {
  // turn "../images/..." or "./images/..." into "/images/..."
  return (p || "").replace(/^\.\.?\//, "/");
}

function productCardTemplate(p) {
  const name  = p.Name || p.name || "Unnamed";
  const img   = normalizePath(p.Image || p.image) || "/images/logos/noun_Tent_2517.svg";
  const price = p.FinalPrice ?? p.finalPrice ?? p.price ?? "";
  const desc  = p.Description || p.description || "";

  return `
    <li class="product-card">
      <img src="${img}" alt="${name}" loading="lazy" />
      <h2>${name}</h2>
      ${price !== "" ? `<p class="price">$${price}</p>` : ""}
      ${desc ? `<p class="desc">${desc}</p>` : ""}
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    try {
      const products = await this.dataSource.getProducts();
      console.log("Loaded products:", products);
      if (!Array.isArray(products) || products.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }
      renderListWithTemplate(productCardTemplate, this.listElement, products);
    } catch (err) {
      console.error("ProductList.init error:", err);
      this.listElement.textContent = "Unable to load products.";
    }
  }
}
