const apiUrl = "https://api.noroff.dev/api/v1/rainy-days"

const productDiv = document.getElementById("product-container");
const filterForGenders = document.getElementById("genders");
const filterButtonForGenders = document.getElementById("genders-filter-button");

let allProducts = {};

// Fetching products / data from API URL
async function fetchProducts() {
    try {
        const response = await fetch("apiUrl");
        if (!response.ok) {
            console.error(`Failed to fetch products due to the following error: ${response.status}`);
        }
        const data = await response.json();
        allProducts = data.data;
        let displayTheseProducts = {};
        const genderSelected = filterForGenders.value;
        if (genderSelected !== "all") {
            displayTheseProducts = allProducts.filter(product => product.gender === genderSelected);
        } else {
            displayTheseProducts = allProducts;
        }
        displayTheseProducts(displayedProducts);
        
    } catch (error) {
        productDiv.innerHTML = `<p>Unfortunatly we failed to fetch our products: ${error.message}`;
    }
}

function displayedProducts(products) {
    productDiv.innerHTML = "";
    if (products.length === 0) {
        productDiv.innerHTML = "<p>No products is associated with this category</p>"
        return;
    }

    product.ForEach(product => {
        const productDiv = document.createElement("section");
        productElement.innerHTML`
        <div class="jacketimage">
            <img src:"${product.image}" class="jacketimg">
        </div>
        <div>
            <p>${product.title}</p>
            <p>${product.gender} Jacket</p>
            <p>NOK ${product.price}</p>
        </div>
        <div>
            <a href="product.html?id=${product.id}" class="readmore1">Read More</button>
        <div>
    `;
        productContainer.appendChild(productDiv);
    })
}

function fetchProducts(products) {

}

// Displaying all products from API
fetchProducts();
