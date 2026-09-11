//^ Variables 

let
    carousel = document.querySelector("#Home .m-carousel"),
    carouselItem = carousel.querySelector(".m-carousel-item.active"),


    nextBtn = document.querySelector("#Home .next"),
    prevBtn = document.querySelector("#Home .prev"),


    logoImg = document.querySelector(".navbar-brand img"),
    browserLogo = document.querySelector("link[rel='icon']"),
    titleSectionImg = document.querySelectorAll(".title img"),

    loadingGif = document.querySelector(".loading"),

    navbar = document.querySelector("nav.navbar"),
    navLinks = navbar.querySelectorAll(".nav-link"),

    // ^ Latest Section variables
    productsContainer = document.querySelector("#Latest .content"),

    // ^ Featured Section variables
    featuresContainer = document.querySelector("#Featured .content .row"),

    loginIcon = document.querySelector("nav.navbar .collapse .icons .login-icon"),
    cartIcon = document.querySelector("nav.navbar .collapse .icons .cart-icon"),

    allPopUpEle = document.querySelectorAll(".popup .popup-element"),
    noProductAlert = document.querySelector(".no-product"),

    // ^ Add To Cart
    addProductToCart = [],
    addToFav = [];

// ^ LocalStorage
if (localStorage.getItem("addProductToCart") === null) {
    updateLocalStorage();
} else {
    addProductToCart = JSON.parse(localStorage.getItem("addProductToCart"));
    addToFav = JSON.parse(localStorage.getItem("addToFav"));
}

// ^ Loading Section
window.addEventListener("DOMContentLoaded", function () {
    loadingGif.classList.add("hide");

    setTimeout(function () {
        loadingGif.classList.add("d-none");
    }, 1000);
})

// ^ Next and Previous Buttons
nextBtn.addEventListener("click", function () {
    let currentCarouselItem = document.querySelector("#Home .m-carousel-item.show-carousel"),
        firstCarouselItem = document.querySelector(".m-carousel-item:first-of-type"),
        nextCarouselItem = currentCarouselItem.nextElementSibling ?? firstCarouselItem,
        nextDataName = nextCarouselItem.dataset.color;

    currentCarouselItem.classList.remove("show-carousel");
    nextCarouselItem.classList.add("show-carousel");

    // * Function Call
    changeColor(nextDataName);
    changeImg(nextDataName, logoImg, "logo", "src");
    changeImg(nextDataName, browserLogo, "logo", "href");

    titleSectionImg.forEach((image) => {
        changeImg(nextDataName, image, "correct", "src");
    })
});

prevBtn.addEventListener("click", function () {
    let currentCarouselItem = document.querySelector("#Home .m-carousel-item.show-carousel"),
        lastCarouselItem = document.querySelector(".m-carousel-item:last-of-type"),
        prevCarouselItem = currentCarouselItem.previousElementSibling ?? lastCarouselItem,
        prevDataName = prevCarouselItem.dataset.color;

    currentCarouselItem.classList.remove("show-carousel");
    prevCarouselItem.classList.add("show-carousel");

    // * Function Call
    changeColor(prevDataName);
    changeImg(prevDataName, logoImg, "logo", "src");
    changeImg(prevDataName, browserLogo, "logo", "href");

    titleSectionImg.forEach((image) => {
        changeImg(prevDataName, image, "correct", "src");
    })

});

// ^ Navbar Scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ^ Scroll Section
navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        let currentNavLink = navbar.querySelector(".nav-link.active"),
            currentId = link.getAttribute("href"),
            currentSection = document.querySelector(currentId),
            sectionTop = currentSection.offsetTop - navbar.clientHeight;

        currentNavLink.classList.remove("active");
        link.classList.add("active");

        window.scrollTo(0, sectionTop);
    });
});

window.addEventListener("scroll", function () {

    navLinks.forEach(function (link) {

        let currentId = link.getAttribute("href")
        currentSection = document.querySelector(currentId),
            sectionTop = currentSection.offsetTop - navbar.clientHeight,
            sectionBottom = sectionTop + currentSection.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {

            navbar.querySelector(".nav-link.active")?.classList.remove("active");

            link.classList.add("active");
        }

    });

});

// ^ Latest Section
latest.forEach(function (product) {

    let isProductIntoCart = checkCart(product.id);

    productsContainer.innerHTML += `
        <div 
            class="item row mainBorder rounded-4 py-4 mx-4"
            data-selected-size="${isProductIntoCart?.size ?? product.sizes[0]}"
            data-selected-color="${isProductIntoCart?.color ?? product.colors[0]}"
        >
            <div class="part-1 col-lg-6">
                <div class=" row">
                    <div class="photos col-12 col-lg-2 px-3">
                        <ul class="d-flex flex-row flex-lg-column gap-2 p-0 m-0">
                        ${createLiImgEle(product.images)}
                        </ul>
                    </div>
                    <div class="image col-lg-10">
                        <img src="./images/products/${product.images[0]}" class="img-fluid" alt="shoes">
                    </div>
                </div>
            </div>

            <div class="part-2 col-lg-6">
                <h3 class="main-color">${product.name}</h3>
                <p class="text-muted">${product.description}</p>

                <p id="Price">
                    <span class="fw-bolder me-2">Price :</span>
                    <span class="main-color me-1 ${(product.discount == 0) ? "d-none" : ""}"> <del>${product.price}<sup>$</sup></del></span>
                    <span>${product.price * (1 - product.discount)}<sup>$</sup></span>
                </p>

                <div id="Size" class="d-flex gap-1 align-items-center">
                    <span class="fw-bolder me-2">Size :</span>
                    <ul class="d-flex gap-2 p-0 m-0">
                        ${createLiSizeEle(product.sizes, isProductIntoCart)}
                    </ul>
                </div>

                ${(isProductIntoCart == null) ?
            `<button class="add-to-cart mainButton rounded-2 p-2" onclick="addToCart(${product.id} , this)">Add to Cart</button>`
            :
            `<button class="add-to-cart mainButton rounded-2 p-2 remove" onclick="removeFromCart(${product.id} , this)">Remove From Cart</button>`
        }

            </div>
        </div>
    `
});

// ^ Featured Section
features.forEach(function (product) {

    featuresContainer.innerHTML += `
        <div class="box col-12 col-sm-6 col-md-4 col-lg-3">
            <div 
                class="item bg-white px-4 py-3 rounded-3 text-center" 
                data-loved="false"
                data-id="${product.id}"
                >

                <i class="fa-regular fa-heart loved"></i>

                <p class="discount ${(product.discount == 0) ? 'd-none' : ""}" >-${product.discount * 100}%</p>

                <div class="image">
                    <img src="./images/products/${product.images[0]}" class="img-fluid" alt="product">
                </div>

                <div class="search d-flex justify-content-center align-items-center rounded-circle">
                    <i class="fa-solid fa-magnifying-glass" onclick="showProduct(${product.id})"></i>
                </div>

                <ul class="d-flex justify-content-center align-items-center gap-2 list-unstyled mb-0">
                    ${createLiEle(product.images)}
                </ul>

                <div class="text">
                    <h6>${product.name}</h6>

                    <p>
                        <span class="main-color me-1 ${(product.discount == 0) ? 'd-none' : ""}">
                            <del>${product.price}<sup>$</sup></del>
                        </span>
                        <span>${(product.price * (1 - product.discount)).toFixed(2)}<sup>$</sup></span>
                    </p>
                </div>
            </div>
        </div>
    `
});

// ^ Popup
allPopUpEle.forEach(function (popupEle) {
    popupEle.addEventListener("click", function (e) {
        e.stopPropagation();
    })
});

// ^ loved Section
let lovedIcons = document.querySelectorAll("#Featured .item > i.loved");

lovedIcons.forEach((lovedIcon) => {
    let itemEle = lovedIcon.parentElement,
        productId = itemEle.dataset.id;

    if (localStorage.getItem(`loved-${productId}`) == "true") {

        lovedIcon.classList.add("lovedColor");
        itemEle.dataset.loved = "true";

    }

    lovedIcon.addEventListener("click", function () {

        if (itemEle.dataset.loved == "false") {
            // ^ Love
            lovedIcon.classList.add("fa-beat");
            setTimeout(() => {
                lovedIcon.classList.remove("fa-beat");
            }, 1000);
            itemEle.dataset.loved = "true";

            localStorage.setItem(`loved-${productId}`, "true");

            lovedIcon.classList.add("lovedColor");
        } else {
            // ^ Unlove
            lovedIcon.classList.remove("lovedColor");

            itemEle.dataset.loved = "false";
            localStorage.removeItem(`loved-${productId}`);

        }

    });
});