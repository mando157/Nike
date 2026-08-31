// ^ Changing Color
function changeColor(colorName) {
    let html = document.querySelector("html"),
        newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);

    html.style.setProperty("--main-color", newColor);
}

// ^ Changing Image
function changeImg(imgSrc , image , common , attribute) {
    let srcOfImg = image.getAttribute(attribute),
        srcNameArr = srcOfImg.split("/");

    srcNameArr[srcNameArr.length - 1] = `${imgSrc}-${common}.png`;

    let srcName = srcNameArr.join("/");

    image.setAttribute(attribute, srcName);

}