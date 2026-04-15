import { products } from './data.js';
import { addToCart, goToDetails } from './cart.js';

// جعل الدوال متاحة للـ HTML لأننا نستخدم Type="module"
window.addToCart = addToCart;
window.goToDetails = goToDetails;

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const categoryFromURL = params.get("category");

    const container = document.getElementById("productsContainer");
    const categoryCheckboxes = document.querySelectorAll(".categoryFilter");
    const colorCheckboxes = document.querySelectorAll(".colorFilter");
    const sizeCheckboxes = document.querySelectorAll(".sizeFilter");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");

    function displayProducts(list) {
        container.innerHTML = "";
        list.forEach(product => {
            container.innerHTML += ` 
                <div class="product-card" onclick="goToDetails(${product.id})">
                    <img src="${product.img}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(event, ${product.id})">Add to Cart</button>
                </div>`;
        });
    }

    function applyFilters() {
        let selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        let selectedColors = Array.from(colorCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        let selectedSizes = Array.from(sizeCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        let maxPrice = priceRange.value;

        let filtered = products.filter(product => {
            let matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            let matchColor = selectedColors.length === 0 || selectedColors.includes(product.color);
            let matchSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
            let matchPrice = product.price <= maxPrice;
            return matchCategory && matchColor && matchSize && matchPrice;
        });

        displayProducts(filtered);
    }

    // المستمعات (Listeners)
    if (priceRange) {
        priceRange.oninput = () => {
            priceValue.innerText = priceRange.value;
            applyFilters();
        };
    }

    [categoryCheckboxes, colorCheckboxes, sizeCheckboxes].forEach(group => {
        group.forEach(cb => cb.onchange = applyFilters);
    });

    // التنفيذ الأولي
    if (categoryFromURL) {
        const filtered = products.filter(p => p.category.toLowerCase() === categoryFromURL.toLowerCase());
        displayProducts(filtered);
    } else {
        displayProducts(products);
    }
});