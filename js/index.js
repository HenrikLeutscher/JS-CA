fetch("https://v2.api.noroff.dev/rainy-days")
.then(response => response.json()) // Convert response to JSON

// Global variable to store all fetched products
let allProducts = [];

// Select the product-line container
const productLine = document.getElementById("product-section");

// Fetch all products from the API
async function fetchProducts() {
  try {
      const response = await fetch("https://v2.api.noroff.dev/rainy-days");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      allProducts = data.data;

      allProducts = allProducts.filter(product => product && product.title);

      displayProducts(allProducts);

  } catch (error) {
      console.error("Error fetching products:", error);
  }
}


// Function to display products
function displayProducts(products) {

  productLine.innerHTML = "";

  products.forEach((product) => {
      const productElement = createProductElement(product);
      productLine.appendChild(productElement);
  });
}


function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("jacket-product");

  const productLink = document.createElement("a");
  productLink.href = `html/product-page.html?id=${product.id}`;
  productLink.title = product.title;

const imageContainer = document.createElement("div");
imageContainer.classList.add("image-container");

const productImage = document.createElement("img");
productImage.classList.add("product-image");

if (product.image && product.image.url) {
  productImage.src = product.image.url;
} else {
  productImage.src = "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg";
}

productImage.alt = product.title;

imageContainer.appendChild(productImage);
productLink.appendChild(imageContainer);
productContainer.appendChild(productLink);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-information");

  const title = document.createElement("h3");
  title.textContent = product.title;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${product.gender}`;

  const price = document.createElement("p");
  price.classList.add("view-more")
  price.textContent = `${product.price}$ incl. Taxes`;

  const viewMore = document.createElement("p");
  price.textContent = `View More`;

  productInfo.appendChild(title);
  productInfo.appendChild(gender);
  productInfo.appendChild(price);

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("add-to-cart");

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart-button");
  addToCartButton.textContent = "Add to cart";

  // Create favorite button
  const favoriteButton = document.createElement("div");
  favoriteButton.classList.add("favorite-button");
  favoriteButton.innerHTML = '<i class="bi bi-heart favorite"></i>';

  // Check if the product is already a favorite
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.some(fav => fav.id === product.id)) {
      favoriteButton.classList.add("favorited"); 
  }

  // Add event listener to favorite button
  favoriteButton.addEventListener("click", function () {
      toggleFavorite(product, favoriteButton);
  });

  actionContainer.appendChild(addToCartButton);
  actionContainer.appendChild(favoriteButton);

  productContainer.appendChild(productInfo);
  productContainer.appendChild(actionContainer);

  // Add Event Listener to Add Product to Cart
  addToCartButton.addEventListener("click", function () {
      addToCart(product);
  });

  return productContainer;
}



function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  
    const productExists = cart.some(item => item.id === product.id);
    
    if (productExists) {
        cart = cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));  
    updateCartCount();  
}

document.addEventListener('DOMContentLoaded', function () {
  fetchProducts();
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM Loaded");
  fetchProducts();  // Fetch products if you're displaying them
  updateCartCount();  // Update the cart count when the page loads
});



function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const cartQtyElement = document.getElementById("cart-qty-count");
  if (cartQtyElement) {
      cartQtyElement.innerText = totalItems;
  }
}

function toggleFavorite(product, buttonElement) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const productIndex = favorites.findIndex(fav => fav.id === product.id);
  const icon = buttonElement.querySelector("i"); 

  if (productIndex === -1) {
      // Add to favorites
      favorites.push(product);
      buttonElement.classList.add("favorited");
      icon.classList.remove("bi-heart"); 
      icon.classList.add("bi-heart-fill"); 
  } else {
      // Remove from favorites
      favorites.splice(productIndex, 1);
      buttonElement.classList.remove("favorited");
      icon.classList.remove("bi-heart-fill"); 
      icon.classList.add("bi-heart"); 
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}


