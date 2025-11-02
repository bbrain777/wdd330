import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const container = document.querySelector(".product-list");

  if (!container) {
    console.error("Cart container (.product-list) not found!");
    return;
  }

  if (cartItems.length === 0) {
    container.innerHTML = `
      <li class="cart-card">
        <p>Your cart is empty.</p>
      </li>
    `;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  container.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Safe checks for optional values
  const image = item.Image || "/images/placeholder.png";
  const name = item.Name || item.NameWithoutBrand || "Unnamed Product";
  const color = item.Colors?.[0]?.ColorName || "N/A";
  const price = item.FinalPrice || 0;

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${image}" alt="${name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${name}</h2>
      </a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${price}</p>
    </li>
  `;
}

renderCartContents();
