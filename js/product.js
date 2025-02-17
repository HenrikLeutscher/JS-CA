const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProductDetails() {
  try {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      throw new Error("Product ID is missing in the URL.");
    }
    
    const response = await fetch(`${apiUrl}/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const product = await response.json();
    displayProductDetails(product);

  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function displayProductDetails(product) {
  const productDetailContainer = document.getElementById("products");
  productDetailContainer.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="ProductContent">
    <h1>${product.title}</h1>
    <p><strong>Gender:</strong> ${product.gender}</p>
    <p><strong>Price:</strong> NOK ${product.price}</p>
    <p><strong>Description:</strong> ${product.description || "No description available."}</p>
    <div>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    </div>
  `;
}

fetchProductDetails();