const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    
    displayProducts(products);
    
    const genderFilter = document.getElementById("genderFilter");
    genderFilter.addEventListener("change", () => {
      const selectedGender = genderFilter.value;
      const filteredProducts = filterProductsByGender(products, selectedGender);
      displayProducts(filteredProducts);
    });

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
      <div class="readmorediv">
          <a href="product.html?id=${product.id}" class="readmore1">Read More</a>
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

// Updating qty amount
function setupQuantityButtons() {
  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");

  increaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      updateCart(button.dataset.id, 1);
      updateQuantityDisplay(button.dataset.id, 1);
    });
  });

  decreaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      updateCart(button.dataset.id, -1);
      updateQuantityDisplay(button.dataset.id, -1);
    });
  });
}


function updateCart(id, change) {
  const cart = getCartData(); 

  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
  }
}

// Update qty on page
function updateQuantityDisplay(id, change) {
  const quantityElement = document.querySelector(`#quantity-${id}`);
  if (quantityElement) {
    let currentQuantity = parseInt(quantityElement.textContent) || 0;
    currentQuantity += change;
    quantityElement.textContent = currentQuantity;
  }
}

// Cart data from local storage
function getCartData() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Local storage for cart qty
function saveCartData(cart) {
  localStorage.setItem('cart', JSON.stringify(cart)); 
}

function updateCart(id, change) {
  const cart = getCartData();

  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change; 
    saveCartData(cart); 
  }
}


// Gender Sorting
function filterProductsByGender(products, gender) {
  if (gender === "all") {
    return products;
  }
  return products.filter(product => product.gender.toLowerCase() === gender.toLowerCase());
}

fetchProducts();
