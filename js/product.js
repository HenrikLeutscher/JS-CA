async function loadProductDetails() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
  
    const data = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = data.data.find(p => p.id === productId);
    if (!product) {
      alert("Product not found.");
      return;
    }
  
    // Render the product details
    renderProductDetails(product);
  
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// Function to render the product details
function renderProductDetails(product) {
  const container = document.getElementById("product-details-container");
  
  const image = document.createElement("img");
  image.src = product.image?.url;
  image.alt = product.title;

  // Creation of image div
  const productImageDiv = document.createElement("div");
  productImageDiv.classList.add("product-image");
  productImageDiv.appendChild(image);

  // Create of info div
  const productInfoDiv = document.createElement("div");
  productInfoDiv.classList.add("product-image");

  // Creation of product information div
  const productInformation = document.createElement("div");
  productInformation.classList.add("product-information");
  
  const title = document.createElement("h1");
  title.textContent = product.title;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${product.gender}`;

  const description = document.createElement("p");
  description.textContent = product.description;
  
  const price = document.createElement("p");
  price.textContent = `NOK ${product.price}`;

  const cartButton = document.createElement("button");
  cartButton.classList.add("add-to-cart");
  cartButton.textContent = "Add to cart";
  
  productInformation.appendChild(title);
  productInformation.appendChild(gender);
  productInformation.appendChild(description);
  productInformation.appendChild(price);
  productInformation.appendChild(cartButton);
  container.appendChild(productImageDiv);
  container.appendChild(productInformation);
  // Add Event Listener to Add Product to Cart
  cartButton.addEventListener("click", function () {
    alert(`${product.title} was successfully added to the cart`);
    addToCart(product);
  });
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

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadProductDetails);