//^ Variables 

let
    carousel = document.querySelector("#Home .m-carousel"),
    carouselItem = carousel.querySelector(".m-carousel-item.active"),


    nextBtn = document.querySelector("#Home .next"),
    prevBtn = document.querySelector("#Home .prev"),


    logoImg = document.querySelector(".navbar-brand img"),
    browserLogo = document.querySelector("link[rel='icon']"),
    titleSectionImg = document.querySelector(".title img"),

    loadingGif = document.querySelector(".loading");

// ^ Loading Section
window.addEventListener("DOMContentLoaded", function () {
    loadingGif.classList.add("hide");

    setTimeout(function () {
        loadingGif.classList.add("d-none");
    }, 1000)
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
    changeImg(nextDataName, titleSectionImg, "correct", "src");
    changeImg(nextDataName, browserLogo, "logo", "href");

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
    changeImg(prevDataName, titleSectionImg, "correct", "src");
    changeImg(prevDataName, browserLogo, "logo", "href");

});
