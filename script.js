"use strict";

// HAMBURGER MENU

// create a hamburger drop-down menu

// add eventlistener to the hamburger menu

const hamburger = document.querySelector(".nav--burger");
const navMenu = document.querySelector(".navbar__list");
const main = document.querySelector("#main--section");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("navbar__list--active");
});

// clicking anywhere except header closes the menu
main.addEventListener("click", () => {
  navMenu.classList.remove("navbar__list--active");
});

// **************************************************************************

// IMAGE CAROUSEL

const leftBtn = document.querySelector(".leftScroll");
const rightBtn = document.querySelector(".rightScroll");
const imgContainer = document.querySelector(".image__slider");
const images = imgContainer.querySelectorAll("img");

// Reset the slider
imgContainer.innerHTML = "";
// start with first image
imgContainer.appendChild(images[0]);

function showNextImage() {
  // create an array from images that allow of indexOf method to get the current image index(method chaining)
  const currentImgIndex = Array.from(images).indexOf(imgContainer.firstChild);

  let nextImg;
  // Changed if to ternary operator as it looks way cooler
  currentImgIndex === images.length - 1
    ? // loop to first
      (nextImg = images[0])
    : // go to next image in the array
      (nextImg = images[currentImgIndex + 1]);

  // clear the current image
  imgContainer.innerHTML = "";
  // add the next image
  imgContainer.appendChild(nextImg);
}

function showPrevImage() {
  const currentImgIndex = Array.from(images).indexOf(imgContainer.firstChild);
  let prevImg;

  // Changed if to ternary operator as it looks way cooler
  currentImgIndex === 0
    ? // loop to last
      (prevImg = images[images.length - 1])
    : // go to previous image in the array
      (prevImg = images[currentImgIndex - 1]);

  // clear the current image
  imgContainer.innerHTML = "";
  // add the previous image
  imgContainer.appendChild(prevImg);
}

rightBtn.addEventListener("click", showNextImage);
leftBtn.addEventListener("click", showPrevImage);

// Experiment : FAILED
// Reason : (the image container is not responsive to changing screen sizes.)
// Approach :find out the width of the container and then scroll that much everytime the button is clicked. and then loop the first and last together.

// const leftBtn = document.querySelector(".leftScroll");
// const rightBtn = document.querySelector(".rightScroll");
// const imgContainer = document.querySelector(".image__slider");
// const containerWidth = document
//   .querySelector(".image__slider")
//   .getBoundingClientRect().width;

// rightBtn.addEventListener("click", function () {
//   if (imgContainer.scrollLeft >= imgContainer.scrollWidth - containerWidth) {
//     imgContainer.scrollLeft = 0;
//   } else {
//     imgContainer.scrollLeft += containerWidth;
//   }
// });

// leftBtn.addEventListener("click", function () {
//   if (imgContainer.scrollLeft === 0) {
//     imgContainer.scrollLeft = imgContainer.scrollWidth - containerWidth;
//   } else {
//     imgContainer.scrollLeft -= containerWidth;
//   }
// });
//

// Shoppping cart

// add to cart trigger the event
// the cart is updated with the item somehow

// const cartContainer = document.querySelector(".cart");
// const cartArea = document.querySelector(".cartItems");
// const closeBtn = document.querySelector(".btn--close-cart");
// const cartOpen = document.querySelector(".cart--icon");

// const prod1 = {
//   id: 1,
//   count: 1,
//   src: "./assets/product1.jpeg",
//   price: "$35",
// };

// const prod2 = {
//   id: 2,
//   count: 1,
//   src: "./assets/product2.jpeg",
//   price: "$35",
// };

// const prod3 = {
//   id: 3,
//   count: 1,
//   src: "./assets/product3.jpeg",
//   price: "$35",
// };

// const prod4 = {
//   id: 4,
//   count: 1,
//   src: "./assets/product4.jpeg",
//   price: "$35",
// };

// const prod5 = {
//   id: 5,
//   count: 1,
//   src: "./assets/product5.jpeg",
//   price: "$35",
// };

// const prod6 = {
//   id: 6,
//   count: 1,
//   src: "./assets/product6.jpeg",
//   price: "$35",
// };

// const prod7 = {
//   id: 7,
//   count: 1,
//   src: "./assets/product7.jpeg",
//   price: "$35",
// };

// const prod8 = {
//   id: 8,
//   count: 1,
//   src: "./assets/product8.jpeg",
//   price: "$35",
// };

// const items_array = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

// const cart = [];

// // add to cart
// const addToCart = function (items) {
//   items.forEach(function (product) {
//     const existingProduct = cart.find((p) => p.id === product.id);
//     if (existingProduct) {
//       existingProduct.count += 1;
//     } else {
//       cart.push({ ...product, count: 1 });
//     }
//   });
//   const cartItems = cart
//     .map(function (product) {
//       return `

//         <div class="cart--card">
//           <div class="cart__image">
//             <img src="${product.src}" alt="product image" />
//           </div>
//           <p>Price: ${product.price} </p>
//           <p>Qty: ${product.count - 1}</p>
//         </div>
//         `;
//     })
//     .join("");

//     cartArea.innerHTML = "";
//   console.log("baaam");
//   cartArea.insertAdjacentHTML("beforeend", cartItems);
// };

// // buttons to link the product and the cart

// const addToCartLinks = document.querySelectorAll(".cart--button a");

// addToCartLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("booom");
//     const productIndex = link.getAttribute("data-product-index");
//     const product = items_array[productIndex];
//     cart.push(product);
//     addToCart(cart);
//   });
// });

// cartOpen.addEventListener("click", function () {
//   cartContainer.classList.remove("hidden");
// });

// closeBtn.addEventListener("click", function () {
//   cartContainer.classList.add("hidden");
// });

// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000
const cartContainer = document.querySelector(".cart");
const cartArea = document.querySelector(".cartItems");
const closeBtn = document.querySelector(".btn--close-cart");
const cartOpen = document.querySelector(".cart--icon");

const items_array = [
  {
    id: 1,
    count: 1,
    src: "./assets/product1.jpeg",
    price: "$35",
  },
  {
    id: 2,
    count: 1,
    src: "./assets/product2.jpeg",
    price: "$35",
  },
  {
    id: 3,
    count: 1,
    src: "./assets/product3.jpeg",
    price: "$35",
  },
  {
    id: 4,
    count: 1,
    src: "./assets/product4.jpeg",
    price: "$35",
  },
  {
    id: 5,
    count: 1,
    src: "./assets/product5.jpeg",
    price: "$35",
  },
  {
    id: 6,
    count: 1,
    src: "./assets/product6.jpeg",
    price: "$35",
  },
  {
    id: 7,
    count: 1,
    src: "./assets/product7.jpeg",
    price: "$35",
  },
  {
    id: 8,
    count: 1,
    src: "./assets/product8.jpeg",
    price: "$35",
  },
];

let cart = [];

// add to cart
const addToCart = function (product) {
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.count += 1;
  } else {
    cart.push({ ...product, count: 1 });
  }
};

const renderCartItems = function () {
  const cartItems = cart
    .map(function (product) {
      return `
        <div class="cart--card">
          <div class="cart__image">
            <img src="${product.src}" alt="product image" />
          </div>
          <p>Price: ${product.price} </p>
          <p>Qty: ${product.count}</p>
        </div>
        `;
    })
    .join("");

  cartArea.innerHTML = "";
  cartArea.insertAdjacentHTML("beforeend", cartItems);
};

const addToCartLinks = document.querySelectorAll(".cart--button a");

addToCartLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const productIndex = link.getAttribute("data-product-index");
    const product = items_array[productIndex];

    addToCart(product);
    renderCartItems();
  });
});

cartOpen.addEventListener("click", () => {
  cartContainer.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  cartContainer.classList.add("hidden");
});
