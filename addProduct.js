document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

       
        const name = form.querySelector('input[name="productname"]').value.trim();
        const description = form.querySelector('input[name="description"]').value.trim();
        const price = form.querySelector('input[name="price"]').value.trim();
        const quantity = form.querySelector('input[id="quantity"]').value.trim();
        const category = form.querySelector('select[name="categories"]').value;
        const photoFile = form.querySelector('input[type="file"]').files[0];

        if (!name || !description || !price || !quantity || !category || !photoFile) {
            alert("Please fill out all fields!");
            return;
        }

        if (!/^[a-zA-Z]/.test(name)) {
            alert("Sorry, the product name needs to start with a letter.");
            return;
        }

        if (isNaN(price)) {
            alert("“The price should only contain numbers!”");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const photo = reader.result;
        
            const NewProduct = {
                name,
                description,
                price,
                quantity,
                category,
                photo,
            };
        
        
            const products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(NewProduct);
            localStorage.setItem("products", JSON.stringify(products));
        
       
            alert(`Product "${name}" added successfully! :)`);
        
       
            window.location.href = "SellerDashboard.html";  
        };
        reader.readAsDataURL(photoFile); 
    });
});