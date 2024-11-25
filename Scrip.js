
        
      
        

        function addOffer()
        {
            var addOffer = document.getElementById("Add-Offer");

            addOffer.onclick= function(){
            event.preventDefault();
            var productNameInput = document.querySelector("input[name='productname']");
            var descriptionInput = document.querySelector("input[name='description']");
            var fileInput = document.querySelector("input[type='file']");
            var errors=[];
            if(!productNameInput.value)
                errors.push("You have to enter a product name");
            else if(!productNameInput.value.match(/^[A-Za-z_0-9]+$/))
                errors.push("Product Name can only contain letters, numbers, and spaces.");

            if(!descriptionInput.value)
                errors.push("Description is required");
            else if(descriptionInput.value.length<10)
                errors.push("Description must be at least 10 characters long.");

            if (!fileInput.value) {
                errors.push("You must upload a photo.");
            }
            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i++) {
                    alert(errors[i]);} 
            } else {
                var offerList = document.querySelector(".offer-list");
				var newOffer = document.createElement("div");
				newOffer.className = "offer";
				
				var offerDetails = document.createElement("div");
				offerDetails.className = "offer-details";
				var offerTitle = document.createElement("h3");
				offerTitle.textContent = productNameInput.value;
				var offerDescription = document.createElement("p");
				offerDescription.textContent = descriptionInput.value;
				
				var checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.className = "delete-cb";
				
				var offerImage = document.createElement("img");
				//offerImage.src = "images/placeholder.jpg";
				try{
				offerImage.src = URL.createObjectURL(fileInput.files[0]);
				offerImage.alt = "Offer Photo";
				}catch (e){
					console.error("Error loading image", e);
					offerImage.src = "images/placeholder.jpg";
				}
				
				offerDetails.appendChild(offerTitle);
				offerDetails.appendChild(offerDescription);
				newOffer.appendChild(checkbox);
				newOffer.appendChild(offerImage);
				newOffer.appendChild(offerDetails);
				offerList.appendChild(newOffer);
				
				productNameInput.value = "";
				descriptionInput.value = "";
				fileInput.value = "";
            }

            };
        };
		
		
		
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
};

function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

/////////////////////////////////////////////////////////////////////////////////////////////

function displayCurrentWeek() {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector(".current-week").textContent = 
        `Week Started At:  ${firstDayOfWeek.toLocaleDateString(undefined, options)}`;
};

//////////////////////////////////////////////////////////////////////////////////////////////

function toggleOffers() {
    const hiddenOffers = document.querySelectorAll(".offerHome.hidden");
    hiddenOffers.forEach(offer => {
        offer.classList.toggle("hidden");
    });
    const moreButton = document.getElementById("more-button");
    moreButton.textContent = 
        moreButton.textContent === "More Offers" ? "Show Less" : "More Offers";
};

/////////////////////////////////////////////////////////////////////////////////////////////

function addReviewHoverEffect() {
    const reviews = document.querySelectorAll(".review");
    reviews.forEach(review => {
        review.addEventListener("mouseenter", () => {
            const details = document.createElement("div");
            details.classList.add("review-details");
            details.innerHTML = `
                <p>Customer: ${review.querySelector(".reviewer-name").textContent}</p>
                <p>Product: ${review.querySelector("h3").textContent}</p>
                <p>Rating: ${review.querySelector("h3:nth-of-type(2)").textContent}</p>
                <p>Feedback: ${review.querySelector("p:not(.reviewer-name)").textContent}</p>
            `;
            review.appendChild(details);
        });
        review.addEventListener("mouseleave", () => {
            const details = review.querySelector(".review-details");
            if (details) review.removeChild(details);
        });
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////


window.onload = function() {
    displayCurrentWeek();
    addReviewHoverEffect();
    document.getElementById("more-button").addEventListener("click", toggleOffers);
};

///////////////////////////////////////////////////////////////////////////////////////////////

function showMoreOffers() {
    const additionalOffers = document.querySelectorAll(".additional-offer");
    const moreOffersBtn = document.getElementById("moreOffersBtn");

    additionalOffers.forEach(offer => {
        offer.style.display = "block";
    });
    moreOffersBtn.style.display = "none";
};

document.getElementById("moreOffersBtn").addEventListener("click", showMoreOffers);

//////////////////////////////////////////////////////////////////////////////////////////////

function navigateTo(page) {
  if (page === 'user-page') {
    window.location.href = 'UserPage.html'; 
  } else if (page === 'seller-page') {
    window.location.href = 'SellerDashboard.html'; 
  } else if (page === 'toys-page') {
    window.location.href = 'Toy.html'; 
  } else if (page === 'clothes-page') {
    window.location.href = 'Clothes.html'; 
  } else if (page === 'electronics-page') {
    window.location.href = 'electronics.html'; 
  } else if (page === 'cart') {
    window.location.href = 'Cart.html'; 
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
        
      
        