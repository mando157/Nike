// ^ Changing Color
function changeColor(colorName) {
    let html = document.querySelector("html"),
        newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);

    html.style.setProperty("--main-color", newColor);
}

// ^ Changing Image
function changeImg(imgSrc, image, common, attribute) {
    let srcOfImg = image.getAttribute(attribute),
        srcNameArr = srcOfImg.split("/");

    srcNameArr[srcNameArr.length - 1] = `${imgSrc}-${common}.png`;

    let srcName = srcNameArr.join("/");

    image.setAttribute(attribute, srcName);

}

// ^ Latest Section

// * Create Li Element for Images
function createLiImgEle(imagesArr) {
    let LiElem = "";

    imagesArr.forEach(function (imgName) {
        LiElem += `
            <li class="mainBorder rounded-2 p-2">
                <img src="./images/products/${imgName}" class="img-fluid" alt="shoes" onclick="changePhoto('${imgName}' , this)">
            </li>
        `
    });

    return LiElem;
}

// * Create Li Element for Sizes
function createLiSizeEle(sizeArr) {
    let LiElem = "";

    sizeArr.forEach(function (size) {
        LiElem += `
        <li class="mainButton mainBorder rounded-2 ${size === sizeArr[0] ? "active" : ""}" onclick="ChangeActive(this)">${size}</li>
        `
    });

    return LiElem;
}

// ^ Featured Section
function createLiEle(imageList) {
    let indicator = "";

    imageList.forEach(function (image) {
        indicator += `
            <li class="mainButton ${image == imageList[0] ? "active" : ""}" onclick="changePhoto('${image}' , this);ChangeActive(this)"></li>
        `
    });

    return indicator;
}

// * Change Photo
function changePhoto(imageName , that) {
    let selectedImg = that.closest(".item").querySelector(".image img"),
        srcImgArr = selectedImg.src.split("/");

        srcImgArr[srcImgArr.length - 1] = imageName;

        selectedImg.setAttribute("src" , srcImgArr.join("/"));
}

// * Change Indicator Active 
function ChangeActive(that){
    let currentEle = that.parentElement.querySelector(".active") ;

    currentEle.classList.remove("active");
    that.classList.add("active");
}