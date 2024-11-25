document.addEventListener("DOMContentLoaded", function () {
   
    const products = JSON.parse(localStorage.getItem("products")) || [];

   
    const scrollContainer = document.querySelector(".scroll-container");


    scrollContainer.innerHTML = "";


    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");  


        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

 
        scrollContainer.appendChild(productDiv);
    });
});