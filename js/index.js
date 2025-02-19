fetch("https://api.noroff.dev/api/v1/rainy-days")
.then (response => response.json());

const everyProduct = [];

const products = document.querySelector("product-details");

// fetching products from API
async function fetchProducts() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    if (!response.ok) {
      throw new error("Failed to fetch products")};

      const data = await response.json();
      everyProduct = data.data || [];
      everyProduct = everyProduct.filter(product => product && product.title);

      displayProducts(everyProduct);
    } catch (error) {
      console.error("Error fetching our products: ", error);
  }
}

//Displaying the products

function displayProducts(product) {
  productSection.innerHTML="";

  products.forEach((product) => {
    const productDiv = document.creareElement("div");
    productDiv.appendChild(productElement);
  });
}

function createProductDiv(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("products-div");

  const productLinker = document.createElement("a")
  productLinker.href = `../products.html?id=${product.id}`;
  productLinker.title = product.title;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
}