const checkoutApiUrl = "https://api.noroff.dev/api/v1/rainy-days";

document.addEventListener('DOMContentLoaded', function () {
    displayCheckoutCartProducts();  // Call the function to display the cart products
});
  
// Function to display the cart products on checkout page
function displayCheckoutCartProducts() {
    const checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];  // Get the cart data from localStorage
    const checkoutCartContainer = document.getElementById('checkout-cart-products-container');  // The container where we display the products
    checkoutCartContainer.innerHTML = ''; 
  
    if (checkoutCart.length === 0) {
      // If the cart is empty, show a message
      checkoutCartContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
      // Loop through the cart and display each product
      checkoutCart.forEach(product => {
        const checkoutProductElement = createCheckoutProductElement(product);
        checkoutCartContainer.appendChild(checkoutProductElement);
      });
  
      // Update the cart total
      updateCheckoutCartTotal(checkoutCart);
    }
}
  
// Function to create the product element (for checkout page)
function createCheckoutProductElement(product) {
    const checkoutProductContainer = document.createElement('div');
    checkoutProductContainer.classList.add('checkout-cart-product');
  
    const checkoutProductInfo = document.createElement('div');
    checkoutProductInfo.classList.add('checkout-cart-product-info');
  
    const title = document.createElement('h3');
    title.textContent = product.title;
  
    const price = document.createElement('p');
    price.textContent = `NOK ${product.price} each`;
  
    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${product.quantity}`;
  
    // Append the product information
    checkoutProductInfo.appendChild(title);
    checkoutProductInfo.appendChild(price);
    checkoutProductInfo.appendChild(quantity);
  
    // Remove product from cart button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-cart-item');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      alert(`${product.title} was successfully removed from the cart!`);
      removeFromCart(product.id)
    });
    
    checkoutProductContainer.appendChild(checkoutProductInfo);
    checkoutProductContainer.appendChild(removeButton);
  
    return checkoutProductContainer;
}
  
// Function to remove a product from the cart
function removeFromCart(productId) {
    let checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Filter out the product with the specified productId
    checkoutCart = checkoutCart.filter(product => product.id !== productId);
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(checkoutCart));
  
    // Re-display the cart products
    displayCheckoutCartProducts();
}
  
// Function to calculate and update the total price of the cart (for checkout page)
function updateCheckoutCartTotal(checkoutCart) {
    const total = checkoutCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const checkoutTotalElement = document.getElementById('checkout-cart-total');
    if (checkoutTotalElement) {
      checkoutTotalElement.textContent = total;
    }
}
