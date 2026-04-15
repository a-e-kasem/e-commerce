import { products } from './data.js';

export function addToCart(e, id) {
    e.stopPropagation(); // يمنع فتح صفحة التفاصيل عند الضغط على الزر

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);

    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart ✅`);
    }
}

export function goToDetails(id) {
    window.location.href = `product_details.html?id=${id}`;
}