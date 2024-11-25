// Function to sort products on the Category page
function sortProducts() {
    const sortOption = document.getElementById("sort-options").value;
    const productGrid = document.querySelector(".product-grid");
    const products = Array.from(productGrid.getElementsByClassName("product"));
	

    products.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();

        if (sortOption === "high-to-low") return priceB - priceA;
        if (sortOption === "low-to-high") return priceA - priceB;
        if (sortOption === "a-to-z") return nameA.localeCompare(nameB);
        if (sortOption === "z-to-a") return nameB.localeCompare(nameA);
        return 0;
    });

    products.forEach(product => productGrid.appendChild(product)); // Reorder DOM elements
}

// Increment quantity on the Category page
// Increment quantity on the Category page
// Increment the quantity of the product
function incrementQuantity(button) {
    var quantitySpan = button.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
}

// Decrement the quantity of the product
function decrementQuantity(button) {
    var quantitySpan = button.parentElement.querySelector(".quantity");
    var currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
        quantitySpan.textContent = currentQuantity - 1;
    }
}



// Add product to cart
// Add the product to the cart
function addToCart(button) {
    // Get the product's details
    var productDiv = button.closest(".product");  // Get the closest product div
    var productId = productDiv.getAttribute("data-id");
    var productName = productDiv.getAttribute("data-name");
    var productPrice = parseFloat(productDiv.getAttribute("data-price"));
    var quantity = parseInt(productDiv.querySelector(".quantity").textContent);
	var productImage = productDiv.querySelector("img").getAttribute("src");
	

    // Calculate the total price for the quantity selected
    var totalPrice = productPrice * quantity;

    // Create a product object to store in the cart
    var product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity,
        totalPrice: totalPrice,
		 image: productImage
    };

    // Get cart from localStorage (or create an empty cart if not found)
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    var existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // If the product already exists, update its quantity and total price
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].price * cart[existingProductIndex].quantity;
    } else {
        // If the product doesn't exist, add it to the cart
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, alert the user that the product has been added
    alert(productName + " has been added to your cart!");
}


// Update cart when quantity changes on the Category page
// Update cart when quantity changes on the Category page
function updateCart(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.name === productName);

    if (productInCart) {
        productInCart.quantity = newQuantity;
        productInCart.totalPrice = productInCart.price * newQuantity; // Update total price
        localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    }
}


// Sync Category page quantities with cart
// Sync Category page quantities with cart
function syncCategoryWithCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsOnPage = document.querySelectorAll('.product');

    productsOnPage.forEach(product => {
        const productName = product.dataset.name;
        const cartItem = cart.find(item => item.name === productName);

        if (cartItem) {
            const quantityElement = product.querySelector('.quantity');
            quantityElement.value = cartItem.quantity; // Update displayed quantity
        }
    });
}


// Display cart items on the Cart page
// Display cart items on the Cart page
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartHTML = '';

    cart.forEach(item => {
        const totalPrice = (item.price * item.quantity).toFixed(2);
       cartHTML += `
            <div class="product" data-name="${item.name}">
                <div class="product-info">
                    <div class="cart-product-details">
                        <img src="${item.image}" alt="${item.name}" class="cart-product-image"> <!-- Display product image -->
                        <div class="product-description">
                            <h3>${item.name}</h3>
                            <div class="price-quantity">
                                <span class="price">$${totalPrice}</span> <!-- Display total price -->
                                <label for="quantity">Quantity</label>
                                <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(this)">
                            </div>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="removeFromCart('${item.name}')">Delete</button>
                </div>
            </div>`;
    });

    if (cart.length === 0) {
        cartHTML = '<p>Your cart is empty.</p>';
    }

    cartContainer.innerHTML = cartHTML;
    updateCartTotal();
}

// Update cart item quantity on the Cart page
function updateCartItemQuantity(inputElement) {
    const productElement = inputElement.closest('.product');
    const productName = productElement.dataset.name;
    const newQuantity = parseInt(inputElement.value);

    updateCart(productName, newQuantity); // Update localStorage
    displayCart(); // Re-render the cart with updated quantities and prices
    syncCategoryWithCart(); // Sync back to Category page
}

// Remove product from cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName); // Remove product
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

// Empty the cart
document.getElementById("empty-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to empty your cart?")) {
        localStorage.setItem('cart', JSON.stringify([]));
        displayCart();
    }
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to checkout?")) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
        localStorage.setItem('cart', JSON.stringify([]));
        displayCart();
    }
});

// Initialize the pages on load
window.onload = () => {
    syncCategoryWithCart(); // Sync Category page quantities
    displayCart(); // Display Cart page items
};
