const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProducts() {
  try {
    const respons = await fetch(apiUrl);
    if (!respons.ok) {
      throw new Error(`Failed to fetch products due to the following error: ${respons.status}`);
    }
    const products = await respons.json();
    
    ProductShowcase(products);
    
    const genderFilter = document.getElementById("genderFilter");
    genderFilter.addEventListener("change", () => {
      const selectedGender = genderFilter.value;
      const filteredProducts = filterProductsByGender(products, selectedGender);
      ProductShowcase(filteredProducts);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function ProductShowcase(products) {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  products.forEach(product => {
    const productElement = document.createElement("section");
    productElement.classList.add("rainydaysjacket");
    productElement.innerHTML = `
      <div class="jacketimg">
          <img src="${product.image}" alt="${product.title}" class="jacketimg">
      </div>
      <div>
          <p class="gendercategory">${product.gender}</p>
          <p class="producttitle">${product.title}</p>
          <p class="productprice">NOK ${product.price}</p>
      </div>
      <div class="instockdotdiv">
          <span class="dotinstock" style="background: 'limegreen';"></span>
          <p class="instock">In Stock</p>
      </div>
      <div class="readmorediv">
          <a href="product.html?id=${product.id}" class="readmore1">Read More</a>
      </div>
      <div class="qty">
          <button class="basketqtyminus" data-id="${product.id}">-</button>
          <span class="quantity" id="quantity-${product.id}">0</span>
          <button class="basketqtyplus" data-id="${product.id}">+</button>
      </div>
  `;
    productContainer.appendChild(productElement);
  });

  setupQuantityButtons();
}

// Updating qty amount
function setupQuantityButtons() {
  const basketPlus = document.querySelectorAll(".basketqtyplus");
  const basketMinus = document.querySelectorAll(".basketqtyminus");

  basketPlus.forEach(button => {
    button.addEventListener("click", () => {
      cartUpdater(button.dataset.id, 1);
      updateQuantityDisplay(button.dataset.id, 1);
    });
  });

  basketMinus.forEach(button => {
    button.addEventListener("click", () => {
      cartUpdater(button.dataset.id, -1);
      updateQuantityDisplay(button.dataset.id, -1);
    });
  });
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

function cartUpdater(id, change) {
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
