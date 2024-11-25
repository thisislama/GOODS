
		
		
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

const currentWeekElement = document.querySelector('.current-week');
const currentDate = new Date();
const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
const sundayDate = new Date(currentDate);
sundayDate.setDate(currentDate.getDate() - dayOfWeek); // Set to the most recent Sunday

// Format the date to "7 February"
const options = { day: 'numeric', month: 'long' };
const formattedDate = sundayDate.toLocaleDateString('en-US', options);
currentWeekElement.innerHTML = `This week starts at Sunday, ${formattedDate}`;

//////////////////////////////////////////////////////////////////////////////////////////////

function toggleOffers() {
    const hiddenOffers = document.querySelectorAll(".offerHome.hidden");
	const shouldShow = hiddenOffers[0]?.classList.contains("hidden");
    hiddenOffers.forEach(offer => {
        offer.classList.toggle("hidden", !shouldShow);
    });

        moreButton.textContent = shouldShow ? "Show Less" : "More Offers";
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
    addReviewHoverEffect();
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
        
      
        
