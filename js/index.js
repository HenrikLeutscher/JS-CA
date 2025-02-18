const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

const productDiv = document.getElementById("product-container"); 
const filterForGenders = document.getElementById("gender-filter");

let allProducts = [];

// Product Fetch from API
function fetchProducts() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to fetch products: ${response.status}`);
        return;
      }
      return response.json();
    })
    .then(data => {
      allProducts = data;
      displayProducts(allProducts); 
    })
    .catch(error => {
      productDiv.innerHTML = `<p>Unfortunately, we failed to fetch our products.</p>`;
      console.log(error);
    });
}

// This function is for filtering products based on gender
function filterByGender() {
  const genderSelected = filterForGenders.value;

  let productsToDisplay = allProducts;

  if (genderSelected !== "all") {
    productsToDisplay = allProducts.filter(product => product.gender.trim() === genderSelected);
  }

  displayProducts(productsToDisplay); 
}

// Function for display of each product
function displayProducts(products) {
  productDiv.innerHTML = ""; products

  if (products.length === 0) {
    productDiv.innerHTML = "<p>No products found for this category.</p>";
    return;
  }

  // Loop for products
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <div class="rainydaysjackets">
        <div class="jacketimage">
          <img src="${product.image}" class="jacketimg">
        </div>
        <div>
          <p>${product.title}</p>
          <p>${product.gender} Jacket</p>
          <p>NOK ${product.price}</p>
        </div>
        <div>
          <a href="./product/index.html?id=${product.id}" class="readmore1">Read More</a>
        </div>
        <div class="qty">
          <button class="basketqtyminus" data-id="${product.id}">-</button>
          <span class="quantity" id="quantity-${product.id}">0</span>
          <button class="basketqtyplus" data-id="${product.id}">+</button>
        </div>
      </div>
    `;

    productDiv.appendChild(productElement);
  });
}

filterForGenders.addEventListener("change", filterByGender);

fetchProducts();
