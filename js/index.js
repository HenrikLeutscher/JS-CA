const apiUrl = "https://api.noroff.dev/api/v1/rainy-days"

const productDiv = document.getElementById("product-container"); 
const filterForGenders = document.getElementById("gender-filter");
const filterButtonForGenders = document.getElementById("genders-filter-button");

let allProducts = [];

// Fetching products / data from API URL
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`Failed to fetch products due to the following error: ${response.status}`);
        }
        const data = await response.json();
        allProducts = data;
        let displayTheseProducts = [];
        const genderSelected = filterForGenders.value;
        if (genderSelected !== "all") {
            displayTheseProducts = allProducts.filter(product => product.gender === genderSelected);
        } else {
            displayTheseProducts = allProducts;
        }

        displayedProducts(displayTheseProducts);
        

    } catch (error) {
        productDiv.innerHTML = `<p>Unfortunatly we failed to fetch our products`;
        console.log(error);
    }
}

// Gender Filter
function filterByGender() {
    const genderSelected = filterForGenders.value;
    let displayTheseProducts = [];

    if (genderSelected !== "all") {
        displayTheseProducts = allProducts.filter(product => product.gender.toLowerCase() === genderSelected);
    } else {
        displayTheseProducts = allProducts;
    }

    displayedProducts(displayTheseProducts);
}

function displayedProducts(products) {
    productDiv.innerHTML = ``;
    if (products.length === 0) {
        productDiv.innerHTML = "<p>No products is associated with this category</p>"
        return;
    }

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
                <a href="product.html?id=${product.id}" class="readmore1">Read More</a>
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

// Cart + - 

// Gender

// Displaying all products from API
fetchProducts();
