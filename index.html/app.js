
/* =====================================
   ACTIVITY 5: JAVASCRIPT BASICS
   IPL TICKET BOOKING WEBSITE
===================================== */


/* =====================================
   1. REUSABLE TOAST FUNCTION
===================================== */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    // Clear previous timer
    clearTimeout(toast.timer);

    // Hide notification after 3 seconds
    toast.timer = setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================
   2. SELECT BOOK BUTTONS
===================================== */

const bookButtons = document.querySelectorAll('a[href="#booking"]');


/* =====================================
   3. EVENT HANDLING AND SMOOTH SCROLL
===================================== */

bookButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        // Prevent default page jumping
        event.preventDefault();

        // Get booking section
        const bookingForm = document.getElementById("booking");

        // Smooth scrolling to booking form
        bookingForm.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });


        // Get match name from table
        const matchName = button.closest("tr")?.cells[1]?.textContent.trim();


        // Display confirmation notification
        if (matchName) {

            showToast("Booking form opened for " + matchName);

        } else {

            showToast("Booking form opened successfully!");

        }

    });

});


/* =====================================
   ACTIVITY 7: SELECTOR FORMS AND
   LIVE INTERACTION USING JAVASCRIPT
===================================== */


/* =====================================
   4. SELECT FORM CONTROLS
===================================== */

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const quantityInput = document.getElementById("quantity");


/* =====================================
   5. SELECT BOOKING SUMMARY ELEMENTS
===================================== */

const summaryMatch = document.getElementById("summaryMatch");

const summaryStand = document.getElementById("summaryStand");

const summaryPrice = document.getElementById("summaryPrice");

const summaryQuantity = document.getElementById("summaryQuantity");

const summaryTotal = document.getElementById("summaryTotal");


/* =====================================
   6. TICKET PRICE DETAILS
===================================== */

const ticketPrices = {

    "RCB vs CSK": {
        "General": 500,
        "Premium": 1000,
        "VIP": 2000
    },

    "MI vs KKR": {
        "General": 600,
        "Premium": 1200,
        "VIP": 2200
    },

    "SRH vs RCB": {
        "General": 550,
        "Premium": 1100,
        "VIP": 2100
    }

};


/* =====================================
   7. UPDATE BOOKING SUMMARY
===================================== */

function updateSummary() {

    // Read selected values
    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = Math.max(1, parseInt(quantityInput.value) || 1);

    // Get ticket price
    const price = ticketPrices[selectedMatch][selectedStand];

    // Calculate total amount
    const total = price * quantity;

    // Update Booking Summary Card
    summaryMatch.innerText = selectedMatch;

    summaryStand.innerText = selectedStand;

    summaryPrice.innerText = "₹" + price;

    summaryQuantity.innerText = quantity;

    summaryTotal.innerText = "₹" + total;

    // Display notification
    showToast("Booking Summary Updated!");

}


/* =====================================
   8. CHANGE EVENT LISTENERS
===================================== */

matchSelect.addEventListener("change", updateSummary);

standSelect.addEventListener("change", updateSummary);

quantityInput.addEventListener("change", updateSummary);


/* =====================================
   9. DISPLAY INITIAL SUMMARY
===================================== */

(function() {

    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = Math.max(1, parseInt(quantityInput.value) || 1);

    const price = ticketPrices[selectedMatch][selectedStand];

    summaryMatch.innerText = selectedMatch;

    summaryStand.innerText = selectedStand;

    summaryPrice.innerText = "₹" + price;

    summaryQuantity.innerText = quantity;

    summaryTotal.innerText = "₹" + (price * quantity);

})();
matchSelect.addEventListener("change", updateSummary);

standSelect.addEventListener("change", updateSummary);

quantityInput.addEventListener("input", updateSummary);
