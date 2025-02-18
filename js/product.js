const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

// This function gets the product ID from the URL
function getProductIdFromUrl() {
  const url = window.location.href;
  const productId = url.split('id=')[1]; // Get everything after "id="
  
  if (!productId) {
    console.log("Error: Product ID is missing.");
    return null;
  }
  
  return productId;
}

// This function fetches the product details from the API
function fetchProductDetails() {
  const productId = getProductIdFromUrl(); // Get the product ID
  
  if (!productId) return; // If no product ID, stop the function
  
  fetch(`${apiUrl}/${productId}`)
    .then(response => {
      if (!response.ok) {
        console.log("Error: Something went wrong with the request.");
        return;
      }
      return response.json();
    })
    .then(product => {
      if (product) {
        displayProductDetails(product);
      }
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

// Displaying The products
function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  
  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="ProductContent">
      <h1>${product.title}</h1>
      <p><strong>Gender:</strong> ${product.gender}</p>
      <p><strong>Price:</strong> NOK ${product.price}</p>
      <p><strong>Description:</strong> ${product.description || "No description available."}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
}

// Run the function to fetch and display the product details
fetchProductDetails();
