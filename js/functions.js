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
function createLiImgEle(imagesArr, isProduct = false) {
    let LiElem = "";

    imagesArr.forEach(function (imgName) {
        LiElem += `
            <li class="p-2 ${(isProduct) ? "" : "mainBorder rounded-2"}">
                <img src="./images/products/${imgName}" class="img-fluid" alt="shoes" onclick="changePhoto('${imgName}' , this)">
            </li>
        `
    });

    return LiElem;
}

// * Create Li Element for Sizes
function createLiSizeEle(sizeArr, isProductIntoCart) {
    let LiElem = "";

    sizeArr.forEach(function (size) {
        if (isProductIntoCart == null) {
            LiElem += `
            <li 
                class="mainButton mainBorder rounded-2 ${size === sizeArr[0] ? 'active' : ''}" 
                onclick="ChangeActive(this);changeSelectedSize( '${size}' , this) "
                >
                ${size}
            </li>
            `
        } else {
            LiElem += `
            <li 
                class="mainButton mainBorder rounded-2 ${isProductIntoCart.size == size ? 'active' : ''}" 
                onclick="ChangeActive(this);changeSelectedSize( '${size}' , this) "
                >
                ${size}
            </li>
            `
        }
    });

    return LiElem;
}

// * Create Li Element for Colors
function createLiColorEle(colorArr, isProductIntoCart) {
    let LiElem = "";

    colorArr.forEach(function (color) {
        if (isProductIntoCart == null) {
            LiElem += `
            <li .
                class="rounded-circle ${color === colorArr[0] ? 'active' : ''}"
                onclick="ChangeActive(this) ; changeSelectedColor('${color}' , this)" style="background-color:${color};"
                >
            </li>
            `
        }
        else {
            LiElem += `
            <li .
                class="rounded-circle ${(isProductIntoCart.color == color) ? 'active' : ''}"
                onclick="ChangeActive(this) ; changeSelectedColor('${color}' , this)" style="background-color:${color};"
                >
            </li>
            `
        }
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
function changePhoto(imageName, that) {
    let selectedImg = that.closest(".item").querySelector(".image img"),
        srcImgArr = selectedImg.src.split("/");

    srcImgArr[srcImgArr.length - 1] = imageName;

    selectedImg.setAttribute("src", srcImgArr.join("/"));
}

// * Change Indicator Active 
function ChangeActive(that) {
    let currentEle = that.parentElement.querySelector(".active");

    currentEle.classList.remove("active");
    that.classList.add("active");
}

// ^ Login Popup
function openPopup(popupName) {
    let popupEle = document.querySelector(`.popup[data-type='${popupName}']`);

    popupEle.classList.add("active");
    setTimeout(function () {
        popupEle.classList.add("appear");
    }, 500);
}
function closePopup() {
    let popupEle = document.querySelector(`.popup.active`);

    popupEle.classList.remove("appear");
    setTimeout(function () {
        popupEle.classList.remove("active");
    }, 500);
}

// ^ Product Popup
function getProduct(productId) {
    return products.filter(product => product.id == productId)[0];
}

function showProduct(productId) {
    let product = getProduct(productId),
        productPopup = document.querySelector(".product-popup .popup-element"),
        isProductIntoCart = checkCart(product.id);

    productPopup.innerHTML = `
            <div 
                class="item row mainBgColor py-3 px-4 rounded-4 popup-element"
                data-selected-size="${isProductIntoCart?.size ?? product.sizes[0]}"
                data-selected-color="${isProductIntoCart?.color ?? product.colors[0]}"
            >
                <div class="col-md-6">
                    <div class="content">
                        <div class="image">
                            <img src="./images/products/${product.images[0]}" class="d-block w-75 m-auto" alt="product">
                        </div>

                        <ul class="d-flex gap-2 p-0 m-0">
                            ${createLiImgEle(product.images, true)}
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="text">
                        <h2>${product.name}</h2>
                        <p id="Price">
                            <span class="main-color me-1 ${(product.discount == 0) ? 'd-none' : ""}">
                                <del>${product.price}<sup>$</sup></del>
                            </span>
                            <span>${(product.price * (1 - product.discount)).toFixed(2)}<sup>$</sup></span>
                        </p>
                        <hr>
                        <p>
                        ${product.description}
                        </p>

                        <div id="Size" class=" size d-flex gap-1 align-items-center">
                            <span class="fw-bolder me-2">Size :</span>
                            <ul class="d-flex gap-2 p-0 m-0">
                                ${createLiSizeEle(product.sizes, isProductIntoCart)}
                            </ul>
                        </div>

                        <div id="Colors" class="colors d-flex gap-1 align-items-center">
                            <span class="fw-bolder me-2">Color :</span>
                            <ul class="d-flex gap-2 p-0 m-0">
                                ${createLiColorEle(product.colors, isProductIntoCart)}
                            </ul>
                        </div>

                        ${(isProductIntoCart == null) ?
            `<button class="add-to-cart mainButton rounded-2 p-2" onclick="addToCart(${product.id} , this)">Add to Cart</button>`
            :
            `<button class="add-to-cart mainButton rounded-2 p-2 remove" onclick="removeFromCart(${product.id} , this)">Remove From Cart</button>`
        }
                    
                    </div>
                </div>
            </div>
    `

    openPopup('products');
}

// ^ Add From Cart
function addToCart(productId, that) {
    let product = that.closest(".item"),

        newOrderItem = {
            id: productId,
            size: product.dataset.selectedSize,
            color: product.dataset.selectedColor,
        };

    addProductToCart.push(newOrderItem);

    toggleBtn(that, 'remove');

    that.setAttribute("onclick", `removeFromCart(${productId}, this)`);

    updateLocalStorage();
}

// ^ Remove From Cart
function removeFromCart(productId, that) {
    addProductToCart = addProductToCart.filter((product) => product.id != productId);

    updateLocalStorage();

    toggleBtn(that, 'add');

    that.setAttribute("onclick", `addToCart(${productId}, this)`);
}

// ^ Toggler
function toggleBtn(button, condition) {
    if (condition == 'add') {
        button.classList.remove("remove");
        button.textContent = "Add To Cart"
    } else if (condition == 'remove') {
        button.classList.add("remove");
        button.textContent = "Remove From Cart"
    }
}

// ^ Change Current Size & Color
function changeSelectedSize(size, that) {
    let productEle = that.closest(".item");

    productEle.setAttribute("data-selected-size", size);
}
function changeSelectedColor(color, that) {
    let productEle = that.closest(".item");

    productEle.setAttribute("data-selected-color", color);
}


// ^ Updating LocalStorage
function updateLocalStorage() {
    localStorage.setItem("addProductToCart", JSON.stringify(addProductToCart));
}

// ^ Check Products Into Cart
function checkCart(productId) {
    let item = addProductToCart.filter((product) => product.id == productId);
    return item.length == 1 ? item[0] : null;
}

// ^ Show Cards
function showCardsIntoCart() {
    let cartItems = document.querySelector(".cart-popup[data-type='cart'] .cart-content");

    cartItems.innerHTML = "";

    addProductToCart.forEach(function (cartProduct) {

        let product = getProduct(cartProduct.id);

        cartItems.innerHTML += `
        <div class="box col-sm-6 col-md-4 col-lg-4 px-1 py-2">
            <div class="item rounded-2" data-product-id="${cartProduct.id}">
                <div class="image"><img src="./images/products/${product.images[0]}" class="img-fluid" alt="product"></div>
                <div class="text">
                    <div class="name">
                        <h5>${product.name}</h5>
                    </div>

                    <p id="Price">
                        <span class="fw-bolder me-2">Price :</span>
                        <span class="main-color me-1 ${(product.discount == 0) ? "d-none" : ""}"> <del>${product.price}<sup>$</sup></del></span>
                        <span>${product.price * (1 - product.discount)}<sup>$</sup></span>
                    </p>

                    <div id="Size" class=" size d-flex gap-1 align-items-center">
                        <span class="fw-bolder me-2">Size :</span>
                        <ul class="d-flex gap-2 p-0 m-0">
                            <li class="mainButton mainBorder rounded-2 active">
                                ${cartProduct.size}
                            </li>
                        </ul>
                    </div>

                    <div id="Colors" class="colors d-flex gap-1 align-items-center">
                        <span class="fw-bolder me-2">Color :</span>
                        <ul class="d-flex gap-2 p-0 m-0">
                            <li class="rounded-circle active" style="background-color:${cartProduct.color};"></li>
                        </ul>
                    </div>

                    <button class="btn btn-danger w-100" onclick="removeProductFromCart(${cartProduct.id})">Remove</button>
                </div>
            </div>
        </div>
    `

        updateLocalStorage();
        isEmptyPopup(noProductAlert, addProductToCart);
    });

    openPopup('cart');


}

// ^ Remove From Cart
function removeProductFromCart(productId) {
    let productCard = document.querySelector(`.cart-popup[data-type='cart'] .item[data-product-id='${productId}']`);

    productCard.parentElement.remove();

    addProductToCart = addProductToCart.filter((product) => product.id != productId);
    updateLocalStorage();
    isEmptyPopup(noProductAlert, addProductToCart);
}

function isEmptyPopup(alert, array) {
    if (array.length == 0) {
        alert.classList.remove("d-none");
    } else {
        alert.classList.add("d-none");
    }
}
