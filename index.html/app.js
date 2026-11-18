
/* =====================================
   IPL TICKET BOOKING WEBSITE
   ACTIVITY 5 + ACTIVITY 7 + ACTIVITY 8
===================================== */


/* =====================================
   1. REUSABLE TOAST FUNCTION
===================================== */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================
   ACTIVITY 5: SMOOTH SCROLL AND TOAST
===================================== */

const bookButtons = document.querySelectorAll('a[href="#booking"]');

bookButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const bookingForm = document.getElementById("booking");

        bookingForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Get match name from match card
        const matchName = button.closest(".match-card")?.dataset.match;

        if (matchName) {

            showToast("Booking form opened for " + matchName);

        } else {

            showToast("Booking form opened successfully!");

        }

    });

});


/* =====================================
   ACTIVITY 7: SELECTOR FORMS
===================================== */


/* 2. SELECT FORM CONTROLS */

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const quantityInput = document.getElementById("quantity");


/* 3. SELECT SUMMARY ELEMENTS */

const summaryMatch = document.getElementById("summaryMatch");

const summaryStand = document.getElementById("summaryStand");

const summaryPrice = document.getElementById("summaryPrice");

const summaryQuantity = document.getElementById("summaryQuantity");

const summaryTotal = document.getElementById("summaryTotal");


/* 4. TICKET PRICE DETAILS */

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


/* 5. UPDATE BOOKING SUMMARY */

function updateSummary(showNotification = true) {

    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = Math.max(
        1,
        parseInt(quantityInput.value) || 1
    );

    const price = ticketPrices[selectedMatch][selectedStand];

    const total = price * quantity;

    summaryMatch.innerText = selectedMatch;

    summaryStand.innerText = selectedStand;

    summaryPrice.innerText = "₹" + price;

    summaryQuantity.innerText = quantity;

    summaryTotal.innerText = "₹" + total;

    if (showNotification) {

        showToast("Booking Summary Updated!");

    }

}


/* 6. EVENT LISTENERS */

matchSelect.addEventListener("change", function() {
    updateSummary(true);
});

standSelect.addEventListener("change", function() {
    updateSummary(true);
});

// Update quantity immediately while typing
quantityInput.addEventListener("input", function() {
    updateSummary(false);
});

quantityInput.addEventListener("change", function() {
    updateSummary(true);
});


/* 7. DISPLAY INITIAL SUMMARY */

updateSummary(false);


/* =====================================
   ACTIVITY 8: TEAM FILTER
===================================== */

const teamFilter = document.getElementById("teamfilter");

const matchCards = document.querySelectorAll(".match-card");


teamFilter.addEventListener("change", function() {

    const selectedTeam = teamFilter.value;

    matchCards.forEach(function(card) {

        const teams = card.dataset.teams.split(" ");

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

    showToast("Team filter applied!");

});


/* =====================================
   ACTIVITY 8: GRID AND LIST VIEW
===================================== */

const matchContainer = document.getElementById("matchContainer");

const gridButton = document.getElementById("gridView");

const listButton = document.getElementById("listView");


/* GRID VIEW */

gridButton.addEventListener("click", function() {

    matchContainer.classList.remove("list-view");

    gridButton.classList.add("active-view");

    listButton.classList.remove("active-view");

    showToast("Grid View Selected!");

});


/* LIST VIEW */

listButton.addEventListener("click", function() {

    matchContainer.classList.add("list-view");

    listButton.classList.add("active-view");

    gridButton.classList.remove("active-view");

    showToast("List View Selected!");

});


/* =====================================
   ACTIVITY 8: MOBILE HAMBURGER MENU
===================================== */

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");


/* OPEN AND CLOSE MENU */

menuToggle.addEventListener("click", function() {

    mainNav.classList.toggle("active");

    const isOpen = mainNav.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerText = isOpen ? "✕" : "☰";

});


/* CLOSE MENU AFTER CLICKING A NAVIGATION LINK */

const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        mainNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerText = "☰";

    });

});
