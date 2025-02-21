// Function to create the product element for the order confirmation page
function createOrderProductElement(product) {
    const orderProductContainer = document.createElement('div');
    orderProductContainer.classList.add('order-product');
    
    const title = document.createElement('h3');
    title.textContent = product.title;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${product.quantity}`;

    orderProductContainer.appendChild(title);
    orderProductContainer.appendChild(quantity);

    return orderProductContainer;
}

// Displaying ordered items
async function displayOrderConfirmation() {
    const orderedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const orderedProductsContainer = document.querySelector('.your-order');
    orderedProductsContainer.innerHTML = '';

    if (orderedProducts.length === 0) {
        orderedProductsContainer.innerHTML = 'Your order is empty';
    } else {
        orderedProducts.forEach(product => {
            const orderProductElement = createOrderProductElement(product);
            orderedProductsContainer.appendChild(orderProductElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    displayOrderConfirmation();
});