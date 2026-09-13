/* =========================
   MOBILE NAVBAR
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }
    });
}


/* =========================
   OFFER BAR CLOSE
========================= */

const offerClose = document.getElementById("offerClose");

if (offerClose) {
    offerClose.addEventListener("click", function () {
        const offerBar = document.querySelector(".offer-bar");

        if (offerBar) {
            offerBar.style.display = "none";
        }
    });
}


/* =========================
   COLLECTION SEARCH + FILTER
========================= */

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".collection-card");
const productCount = document.getElementById("productCount");
const noResult = document.getElementById("noResult");

let currentFilter = "all";


function filterProducts() {

    if (!products.length) {
        return;
    }

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let visibleCount = 0;

    products.forEach(function (product) {

        const category = product.dataset.category.toLowerCase();

        const productName = product
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory = product
            .querySelector("p")
            .textContent
            .toLowerCase();

        const searchMatches =
            productName.includes(searchValue) ||
            productCategory.includes(searchValue);

        const filterMatches =
            currentFilter === "all" ||
            category === currentFilter;

        if (searchMatches && filterMatches) {

            product.style.display = "";

            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });


    /* Product count */

    if (productCount) {

        if (visibleCount === 1) {
            productCount.textContent = "Showing 1 product";
        } else {
            productCount.textContent =
                `Showing ${visibleCount} products`;
        }

    }


    /* No results message */

    if (noResult) {

        if (visibleCount === 0) {
            noResult.style.display = "block";
        } else {
            noResult.style.display = "none";
        }

    }

}


/* Search Event */

if (searchInput) {

    searchInput.addEventListener("input", function () {
        filterProducts();
    });

}


/* Filter Events */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterProducts();

    });

});


/* Run once when collection page loads */

if (products.length) {
    filterProducts();
}


/* =========================
   NEWSLETTER
========================= */

const newsletterForms =
    document.querySelectorAll("#newsletterForm");

newsletterForms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput =
            form.querySelector("#newsletterEmail");

        if (!emailInput) {
            return;
        }

        const email = emailInput.value.trim();

        if (email === "") {

            alert("Please enter your email.");

            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }

        alert(
            "Thank you for subscribing to the Nostra newsletter!"
        );

        form.reset();

    });

});


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const formMessage =
            document.getElementById("formMessage");


        if (name.length < 3) {

            formMessage.textContent =
                "Please enter a valid name.";

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;

        }


        if (phone !== "") {

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;

            if (!phonePattern.test(phone)) {

                formMessage.textContent =
                    "Please enter a valid phone number.";

                return;

            }

        }


        if (message.length < 10) {

            formMessage.textContent =
                "Message must contain at least 10 characters.";

            return;

        }


        formMessage.textContent =
            "Your message has been sent successfully!";

        contactForm.reset();

    });

}