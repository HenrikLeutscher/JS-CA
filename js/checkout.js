document.addEventListener('DOMContentLoaded', function () {
  displayCheckoutCartProducts();
});

  
// Creating the product elements
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
  
  checkoutProductInfo.appendChild(title);
  checkoutProductInfo.appendChild(price);
  checkoutProductInfo.appendChild(quantity);
  
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
  
// Removing product(s) from cart
function removeFromCart(productId) {
  let checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];
  checkoutCart = checkoutCart.filter(product => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(checkoutCart));
  displayCheckoutCartProducts();
}
  
// Displaying the products in cart
function displayCheckoutCartProducts() {
  const checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutCartContainer = document.getElementById('checkout-cart-products-container');

  checkoutCartContainer.innerHTML = '';

  if (checkoutCart.length === 0) {
    checkoutCartContainer.innerHTML = '<p>Your cart is empty</p>';
  } else {
    checkoutCart.forEach(product => {
      const checkoutProductElement = createCheckoutProductElement(product);
      checkoutCartContainer.appendChild(checkoutProductElement);
    });
  
    updateCheckoutCartTotal(checkoutCart);
  }
}

// Calculating the total price of all items
function updateCheckoutCartTotal(checkoutCart) {
  const total = checkoutCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const checkoutTotalElement = document.getElementById('checkout-cart-total');
  if (checkoutTotalElement) {
    checkoutTotalElement.textContent = total.toFixed(2);
  }
}
