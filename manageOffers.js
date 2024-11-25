document.addEventListener("DOMContentLoaded", function () {
    // Add New Offer Functionality
    document.getElementById("Add-Offer").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        
        const productName = document.querySelector('input[name="productname"]').value.trim();
        const description = document.querySelector('input[name="description"]').value.trim();
        const offersList = document.querySelector(".offer-list");

        if (!productName || !description) {
            alert("Please fill out both Product Name and Description.");
            return;
        }

        // Create a new offer element dynamically
        const newOffer = document.createElement("div");
        newOffer.className = "offer";
        newOffer.innerHTML = `
            <input type="checkbox" class="delete-cb">
            <img src="images/default-offer.jpg" alt="Offer Photo">
            <div class="offer-details">
                <h3>${productName}</h3>
                <p>${description}</p>
            </div>
        `;
        offersList.appendChild(newOffer);

        // Clear input fields
        document.querySelector('input[name="productname"]').value = "";
        document.querySelector('input[name="description"]').value = "";

        alert("New offer added successfully!");
    });

    // Delete Selected Offers Functionality
    document.querySelector("#delete-offer input[type='submit']").addEventListener("click", function () {
        const checkboxes = document.querySelectorAll(".delete-cb:checked");

        if (checkboxes.length === 0) {
            alert("Please select at least one offer to delete.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
        if (confirmDelete) {
            checkboxes.forEach((checkbox) => {
                const offerElement = checkbox.closest(".offer");
                offerElement.remove();
            });
            alert("Selected offers have been deleted.");
        }
    });
});
