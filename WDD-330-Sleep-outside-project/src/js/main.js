import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Try id first; fall back to class if needed
const listElement =
  document.querySelector("#product-list") ||
  document.querySelector(".product-list");

if (!listElement) {
  console.error("Missing #product-list element in index.html");
} else {
  const dataSource = new ProductData("tents"); // -> /json/tents.json
  const productList = new ProductList("tents", dataSource, listElement);
  productList.init();
}
