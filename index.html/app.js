
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
