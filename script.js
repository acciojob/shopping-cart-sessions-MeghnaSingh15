// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from session storage or initialize empty cart
let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear previous content
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear previous content
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty</li>";
    return;
  }
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product); // Add product to cart
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart)); // Update session storage
    renderCart(); // Re-render the cart
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // Remove product from cart
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart)); // Update session storage
  renderCart(); // Re-render the cart
}

// Clear cart
function clearCart() {
  cart = []; // Reset cart to empty
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart)); // Clear session storage
  renderCart(); // Re-render the cart
}

// Event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id, 10);
    addToCart(productId);
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(e.target.dataset.id, 10);
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
