document.addEventListener('DOMContentLoaded', function () {
    displayOrderConfirmation();
});

// Function to display the products in the order confirmation page
async function displayOrderConfirmation() {
    const orderedProducts = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve the cart data
    const orderedProductsContainer = document.querySelector('.your-order');  // The container where products will be displayed
    orderedProductsContainer.innerHTML = '';  // Clear the container before appending new content

    if (orderedProducts.length === 0) {
        orderedProductsContainer.innerHTML = '<p>Your order is empty.</p>';
    } else {
        // Loop through the cart products and display each one
        orderedProducts.forEach(product => {
            const orderProductElement = createOrderProductElement(product);
            orderedProductsContainer.appendChild(orderProductElement);
        });
    }
}

// Function to create the product element for the order confirmation page
function createOrderProductElement(product) {
    const orderProductContainer = document.createElement('div');
    orderProductContainer.classList.add('order-product');
    
    const title = document.createElement('h3');
    title.textContent = product.title;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${product.quantity}`;

    // Append the product information to the container
    orderProductContainer.appendChild(title);
    orderProductContainer.appendChild(quantity);

    return orderProductContainer;
}
