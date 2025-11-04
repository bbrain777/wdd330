// src/js/ProductData.mjs

export default class ProductData {
  constructor(category) {
    this.category = category; // e.g., "tents"
    this.path = `/json/${category}.json`; // served from Vite public/
  }

  async getData() {
    const res = await fetch(this.path);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${this.path}: ${res.status} ${res.statusText}`,
      );
    }
    const data = await res.json();
    // Support either a plain array or an object with products/category keys
    return Array.isArray(data)
      ? data
      : data.products ?? data[this.category] ?? [];
  }

  async findProductById(id) {
    const products = await this.getData();
    const target = String(id);
    return products.find((p) => String(p.Id ?? p.id) === target);
  }
}
