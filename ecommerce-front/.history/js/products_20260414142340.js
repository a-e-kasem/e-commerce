document.addEventListener("DOMContentLoaded",function(){

const params = new URLSearchParams(window.location.search);
const categoryFromURL = params.get("category");

const products = [
  { id: 1, name: "Jacket", price: 100, category: "Men", color: "Black", size: "M", img: "photos/Jacket.jpg" },
  { id: 2, name: "Dress", price: 150, category:"Woman", color: "White", size: "S", img: "photos/Dress.jpg" },
  { id: 3, name: "T-shirt", price: 80, category: "Men", color: "Black", size: "L", img: "photos/tishert.jpg" },
  { id: 4, name: "T-shirt", price: 90, category: "Men", color: "Black", size: "S", img: "photos/tishert-black.jpg" },
  { id: 5, name: "T-shirt", price: 70, category: "Men", color: "Blue", size: "M", img: "photos/tishert-blue.jpg" },
  { id: 6, name: "Jacket", price: 120, category: "Woman", color: "Black", size: "S", img: "photos/jaket-black.jpg" },
  { id: 7, name: "Jacket", price: 130, category: "Woman", color: "Red", size: "M", img: "photos/jaket-red.jpg" },
  { id: 8, name: "Jacket", price: 125, category: "Men", color: "White", size: "L", img: "photos/jacket-white.jpg" },
  { id: 9, name: "Jacket", price: 155, category: "Men", color: "Black", size: "M", img: "photos/jacket-black.jpg" },
  { id: 10, name: "T-shirt", price: 90, category: "Men", color: "Green", size: "S", img: "photos/tishert-green.jpg" },
  { id: 11, name: "Dress", price: 200, category: "Woman", color: "Green", size: "M", img: "photos/dress1.jpg" },
  { id: 12, name: "Dress", price: 320, category: "Woman", color: "Green", size: "S", img: "photos/dress2.jpg" },
  { id: 13, name: "Dress", price: 400, category: "Woman", color: "Red", size: "M", img: "photos/dress3.jpg" }, 
  { id: 14, name: "Dress", price:250, category: "Woman", color: "Blue", size: "M", img: "photos/dress-blue.jpg" },
  { id: 15, name: "Dress", price: 180, category: "Woman", color: "Green", size: "L", img: "photos/jacket-green.jpg" },
  { id: 16, name: "Dress Kids", price: 50, category: "Kids", color: "Black", size: "L", img: "photos/kids-black.jpg" }, 
  { id: 17, name: "Dress Kids", price: 55, category: "Kids", color: "Red", size: "S", img: "photos/kids-red.jpg" }, 
  { id: 18, name: "Dress Kids", price: 60, category: "Kids", color: "Blue", size: "S", img: "photos/kids-blue.jpg" }, 
  { id: 19, name: "T-shirt Sport", price: 77, category: "Sport", color: "Black", size: "L", img: "photos/sport-black.jpg" }, 
  { id: 20, name: "T-shirt Sport", price: 100, category: "Sport", color: "Black", size: "M", img: "photos/sport-black2.jpg" }, 
  { id: 21, name: "T-shirt Sport", price: 55, category: "Sport", color: "White", size: "M", img: "photos/sport-white.jpg" }, 
  { id: 22, name: "T-shirt Sport", price: 90, category: "Sport", color: "Red", size: "S", img: "photos/sport-red.jpg" }, 
];


function displayProducts(list) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML +=` 
      <div class="product-card" onclick="goToDetails(${product.id})">
        <img src="${product.img}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button onclick="addToCart(event, ${product.id})">Add to Cart</button>
      </div>
      `
    ;
  });
}

window.goToDetails=function(id) {
  window.location.href = `product_details.html?id=${id}`;
}

window.addToCart=function(e, id) {
  e.stopPropagation(); // علشان مايفتحش details

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find(p => p.id === id);

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ✅");
}
const categoryCheckboxes = document.querySelectorAll(".categoryFilter");
const colorCheckboxes = document.querySelectorAll(".colorFilter");
const sizeCheckboxes = document.querySelectorAll(".sizeFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");


priceRange.oninput = () => {
  priceValue.innerText = priceRange.value;
  applyFilters();
};


categoryCheckboxes.forEach(cb => cb.onchange = applyFilters);
colorCheckboxes.forEach(cb => cb.onchange = applyFilters);
sizeCheckboxes.forEach(cb => cb.onchange = applyFilters);


function applyFilters() {

  let selectedCategories = [];
  let selectedColors = [];
  let selectedSizes = [];

  categoryCheckboxes.forEach(cb => {
    if (cb.checked) selectedCategories.push(cb.value);
  });

  colorCheckboxes.forEach(cb => {
    if (cb.checked) selectedColors.push(cb.value);
  });

  sizeCheckboxes.forEach(cb => {
    if (cb.checked) selectedSizes.push(cb.value);
  });

  let maxPrice = priceRange.value;

  let filtered = products.filter(product => {

    let matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    let matchColor =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    let matchSize =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);

    let matchPrice = product.price <= maxPrice;

    return matchCategory && matchColor && matchSize && matchPrice;
  });

  displayProducts(filtered);
}

if (categoryFromURL) {
  const filtered = products.filter(p => 
    p.category.toLowerCase() === categoryFromURL.toLowerCase()
  );
  displayProducts(filtered);
} else {
  displayProducts(products);
}

});
