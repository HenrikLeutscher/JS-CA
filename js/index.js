const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("HTTP error! status: ${response.status}");
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  products.forEach(product => {
    const productElement = document.createElement("section");
    productElement.classList.add("jacket");
    productElement.innerHTML = `
        <div class="productimage">
          <img src="${product.image}" alt="${product.title}" class="productimage">
        </div>
        <div>
          <p class="genderclass">${product.gender}</p>
          <p class="productname">${product.title}</p>
          <p class="productprice">NOK ${product.price}</p>
        </div>
        <div class="instockdotdiv">
          <span class="dotinstock" style="background: 'limegreen'};"></span>
          <p class="instock">In Stock</p>
        </div>
        <div>
          <button class="readmore1">Read More</button
        </div>
        <div class="quantity-controls">
          <button class="decrease" data-id="${product.id}">-</button>
          <span class="quantity" id="quantity-${product.id}">0</span>
          <button class="increase" data-id="${product.id}">+</button>
        </div>
    `;
    productContainer.appendChild(productElement);
  });

  setupQuantityButtons();
}

function setupQuantityButtons() {
  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");

  increaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      updateCart(button.dataset.id, 1);
    });
  });

  decreaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      updateCart(button.dataset.id, -1);
    });
  });
}

function updateCart(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[productId] = (cart[productId] || 0) + change;

  if (cart[productId] <= 0) {
    delete cart[productId];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById(`quantity-${productId}`).textContent = cart[productId] || 0;
}

fetchProducts();
