document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Add to Cart Functionality (Stores image, name & price)
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let itemName = this.getAttribute("data-name");
            let itemPrice = parseFloat(this.getAttribute("data-price"));
            let itemImage = this.closest(".product-card").querySelector("img").src;

            let item = { 
                name: itemName, 
                price: itemPrice, 
                image: itemImage
            };

            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(itemName + " added to cart!");
        });
    });

    // ✅ Display Cart Items in Cart Page (Now properly structured)
    function displayCart() {
        let cartContainer = document.getElementById("cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <div class="cart-item-container">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name"><strong>${item.name}</strong></p>
                        <p class="cart-item-price">Price: ₱${item.price.toLocaleString()}</p>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        // ✅ Remove from Cart
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });
    }

    // ✅ Checkout Process
    let checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is empty!");
            } else {
                document.getElementById("order-confirmation").style.display = "block";
                localStorage.removeItem("cart");
                cart = [];
                displayCart();
            }
        });
    }

    // ✅ Display Cart on Page Load
    displayCart();
});

// ✅ Back Button Function
function goBack() {
    window.history.back();
}

document.getElementById("checkout-btn").addEventListener("click", function () {
    // Redirect to the checkout page
    window.location.href = "checkout.html";
});
