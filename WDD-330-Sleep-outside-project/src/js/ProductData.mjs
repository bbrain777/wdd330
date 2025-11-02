function toJson(res) {
  if (res.ok) return res.json();
  throw new Error(`Bad response: ${res.status} ${res.statusText}`);
}

export default class ProductData {
  constructor(category) {
    this.category = category;          // "tents"
    this.basePath = "/json/";          // served from src/public/json
  }

  async getProducts() {
    const url = `${this.basePath}${this.category}.json`;
    console.log("Fetching:", url);
    const data = await fetch(url).then(toJson);
    // support array or {products:[...]}
    return Array.isArray(data) ? data : (data.products ?? data[this.category] ?? []);
  }

  async findProductById(id) {
    const products = await this.getProducts();
    const target = String(id);
    return products.find(p => String(p.Id ?? p.id) === target);
  }
}
