const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
    updateCartCounter(); // Ensure counter shows the right value on load
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
          <p class="genderclass">${product.category}</p>
          <p class="productname">${product.title}</p>
          <p class="productprice">USD ${product.price.toFixed(2)}</p>
        </div>
        <div class="instockdotdiv">
          <span class="dotinstock" style="background: ${product.stock > 0 ? 'limegreen' : 'red'};"></span>
          <p class="instock">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
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
  updateCartCounter();
}

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const totalItems = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartIcon = document.querySelector(".icon-cart-counter");

  if (cartIcon) {
    cartIcon.textContent = totalItems;
  } else {
    const icon = document.querySelector('.icons a[href="checkout.html"]');
    const counter = document.createElement("span");
    counter.classList.add("icon-cart-counter");
    counter.textContent = totalItems;
    counter.style.position = "absolute";
    counter.style.top = "5px";
    counter.style.right = "5px";
    counter.style.background = "red";
    counter.style.color = "white";
    counter.style.padding = "2px 6px";
    counter.style.borderRadius = "50%";
    icon.appendChild(counter);
  }
}

fetchProducts();
