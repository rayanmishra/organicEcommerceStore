import app from './firbase-config.js';

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js';

const myDatabase = getDatabase(app);

const cartRef = ref(myDatabase, '/cart');
const inventoryRef = ref(myDatabase, '/inventory');

// creating a function to add to database

const addToDatabase = (key, value) => {
  const customRef = ref(myDatabase, key);
  set(customRef, value);
};

// DATA SECTION
const cheapPrice = () => parseFloat(Math.random() * (5 - 1) + 1).toFixed(2);
const expPrice = () => parseFloat(Math.random() * (15 - 10) + 10).toFixed(2);

export const totalInventory = [
  {
    productName: 'Tomatoes',
    id: 0,
    qty: 1,
    src: './assets/product1.jpeg',
    price: cheapPrice(),
  },
  {
    productName: 'Lime',
    id: 1,
    qty: 1,
    src: './assets/product2.jpeg',
    price: cheapPrice(),
  },
  {
    productName: 'Organic Eggplant',
    id: 2,
    qty: 1,
    src: './assets/product3.jpeg',
    price: expPrice(),
  },
  {
    productName: 'Cucumber',
    id: 3,
    qty: 1,
    src: './assets/product4.jpeg',
    price: cheapPrice(),
  },
  {
    productName: 'Organic Peas',
    id: 4,
    qty: 1,
    src: './assets/product5.jpeg',
    price: expPrice(),
  },
  {
    productName: 'Lettuce',
    id: 5,
    qty: 1,
    src: './assets/product6.jpeg',
    price: cheapPrice(),
  },
  {
    productName: 'Cabbage',
    id: 6,
    qty: 1,
    src: './assets/product7.jpeg',
    price: cheapPrice(),
  },
  {
    productName: 'Organic Lettuce',
    id: 7,
    qty: 1,
    src: './assets/product8.jpeg',
    price: expPrice(),
  },
];

for (let i = 0; i <= 7; i++) {
  totalInventory[i].base = totalInventory[i].price;
}

const cart = [0];

// adding the inventory to database
// addToDatabase('inventory', totalInventory);

// // adding cart to data
// addToDatabase('cart', cart);
// // console.log(cart);

// // Function to Display the items on the page
const productGallery = document.querySelector('.product__gallery');

const displayItems = (stock) => {
  productGallery.innerHTML = '';

  stock.forEach((item) => {
    const newListItem = document.createElement('div');
    newListItem.innerHTML = `<img
    src=${item.src}
    alt="Image of ${item.productName}"
    />
    <p class="product--heading">${item.productName}</p>
    <p class="body--text product--text">
    Lorem ipsum dolor sit amet consectetur, Adipisicing Elit
    Laboriosam.
    </p>
    <div class="product--price">
    <p>$${item.price}</p>
    </div>
    <div class="cart--button">
    <a href="#" dataindex=${item.id} class="btn btn--cart"
      >Add To Cart</a
    >
    </div>`;

    newListItem.classList.add('product__card');
    productGallery.appendChild(newListItem);
  });
};
// // Importing data from Firebase

onValue(inventoryRef, function (snapshot) {
  const ourData = snapshot.val();
  // storing the data in inventory variable
  const inventory = ourData;
  displayItems(inventory);
});
// const emptyCartMessage = document.querySelector('.empty-cart-message');

// productGallery.addEventListener('click', function (e) {
//   // get parent list item from child button

//   if (e.target.tagName === 'BUTTON') {
//     const chosenProductIndex = e.target.attributes.dataindex.value;
//     const selectedProductRef = ref(
//       myDatabase,
//       `/inventory/${chosenProductIndex}`
//     );

//     get(selectedProductRef).then((snapshot) => {
//       const productData = snapshot.val();

//       productData.qty = 1;
//       push(cartRef, productData);
//     });
//   }
// });

// onValue(cartRef, function (snapshot) {
//   const cartData = snapshot.val();

//   updateCart(cartData);
// });

// const updateCart = (cartData) => {
//   const cartDropdownList = document.querySelector('.cart-dropdown ul');

//   cartDropdownList.innerHTML = '';

//   // removes empty cart message when cart exists and contains items
//   if (cartData && Object.keys(cartData).length > 0) {
//     emptyCartMessage.classList.add('make-invisible');
//   }
//   // adds empty cart message back when when cart is empty
//   else {
//     emptyCartMessage.classList.remove('make-invisible');
//   }

//   let listItemIndex = 0;
//   // for cart totals
//   const qtyArray = [];
//   const costArray = [];

//   for (let key in cartData) {
//     const newCartItem = document.createElement('li');

//     newCartItem.classList.add('full-cart');
//     const item = cartData[key];

//     const uniqueId = Object.keys(cartData)[listItemIndex];
//     listItemIndex += 1;

//     newCartItem.innerHTML = `
//       <div class="arrows">
//           <image class=arrows src="./organic-project/assets/icons/chevron-up-outline.svg" alt="up arrow"></image>
//           <p>${item.qty}</p>
//           <img class=arrows src="./organic-project/assets/icons/chevron-down-outline.svg" alt="down arrow">
//       </div>
//       <img class="product-image" src=${item.src} alt=${item.alt}/>
//       <div class="cart-dropdown-info-container">
//           <h4>${item.productName}</h4>
//           <p class="price">${item.price}</p>
//       </div>
//       <div id=${uniqueId} class="cart-x">
//           <div class="lines a"></div>
//           <div class="lines b"></div>
//       </div>
//     `;
//     cartDropdownList.append(newCartItem);

//     // for cart totals
//     const quantities = cartData[key].qty;
//     const prices = parseFloat(cartData[key].price);
//     qtyArray.push(quantities);
//     costArray.push(prices);
//   }
//   cartTotals(qtyArray, costArray);
// };

// const cartTotals = (qtyArray, costArray) => {
//   const cartCounter = document.querySelector('.item-num > p');
//   const totalCost = document.querySelector('.total-cost > p');
//   const subtotal = document.querySelector('.subtotal').lastElementChild;
//   // console.log(subtotal);
//   const cartItemTotal = qtyArray.reduce((total, num) => {
//     return total + num;
//   });
//   const cartCostTotal = costArray.reduce((total, num) => {
//     return total + num;
//   });
//   cartCounter.textContent = cartItemTotal;
//   totalCost.textContent = '$' + cartCostTotal.toFixed(2);
//   subtotal.textContent = '$' + cartCostTotal.toFixed(2);
// };

// /* #region - cart item removal */
// const cartDropdownList = document.querySelector('.cart-dropdown-list');

// // const deletedCartItem = cartRemoveButton.parentElement;

// const removeCartItem = (e) => {
//   let clickedElement = e.target;
//   // runs only when X is clicked
//   if (
//     clickedElement.className === 'cart-x' ||
//     clickedElement.parentElement.className === 'cart-x'
//   ) {
//     // gets parent div IF child is clicked
//     clickedElement = clickedElement.closest('.cart-x');
//     const nodeToDelete = ref(myDatabase, `/cart/${clickedElement.id}`);

//     remove(nodeToDelete);
//   }
// };
// cartDropdownList.addEventListener('click', removeCartItem);

// /* #endregion - cart item removal */

// // Search bar implementation

const btnSearch = document.querySelector('.product__search');
const searchInput = document.querySelector('[data-search]');
const resetInput = document.querySelector('.product__reset');

// // search function
const searchFunction = (stock, value) => {
  console.log(stock);
  // console.log(value);
  let counter = 0;
  productGallery.innerHTML = '';
  stock.forEach((item, i) => {
    if (item.productName.toLowerCase().includes(value.trim().toLowerCase())) {
      console.log('true', stock[i]);

      const newListItem = document.createElement('div');
      newListItem.innerHTML = `<img
      src=${item.src}
      alt="Image of ${item.productName}"
      />
      <p class="product--heading">${item.productName}</p>
      <p class="body--text product--text">
      Lorem ipsum dolor sit amet consectetur, Adipisicing Elit
      Laboriosam.
      </p>
      <div class="product--price">
      <p>$${item.price}</p>
      </div>
      <div class="cart--button">
      <a href="#" dataindex=${item.id} class="btn btn--cart"
        >Add To Cart</a
      >
      </div>`;

      newListItem.classList.add('product__card');
      productGallery.appendChild(newListItem);
      counter++;
    }
  });
  if (counter === 0) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `<h2>Sorry Product not found. Try again ! </h2>`;
    productGallery.appendChild(newListItem);
  }
};

// intitiates the event by getting the snapshot from firebase
btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
  // extracting search input value
  const value = searchInput.value;

  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // sending the stock and search value to the search function
    searchFunction(stock, value);
  });
  // clearing the input field
  searchInput.value = '';
});

resetInput.addEventListener('click', function (e) {
  e.preventDefault();

  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // using displayItems function to reset
    displayItems(stock);
  });
  // clearing the input field
  searchInput.value = '';
  btnFilter.value = 'default';
});

// filter the Product Section
const btnFilter = document.querySelector('#filter');
// resetting the filter at every refresh
btnFilter.value = 'default';

// price up function
const priceUp = (stock) => {
  stock.sort(function (a, b) {
    return b.price - a.price;
  });
  displayItems(stock);
};

// price up function
const priceDown = (stock) => {
  stock.sort(function (a, b) {
    return a.price - b.price;
  });
  displayItems(stock);
};

// bestselling function
const bestSelling = (stock) => {
  stock.sort(function (a, b) {
    return Math.random() - 0.5;
  });

  displayItems(stock);
};

btnFilter.addEventListener('change', function () {
  const value = this.value;

  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // sending the stock and search value to the search function
    if (value === 'price-up') {
      priceUp(stock);
    } else if (value === 'price-down') {
      priceDown(stock);
    } else if (value === 'bestselling') {
      bestSelling(stock);
    } else {
      displayItems(stock);
    }
  });
});
