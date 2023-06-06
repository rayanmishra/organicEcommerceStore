import app from './firbase-config.js';

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
  remove,
  update,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js';

// Initializing the Firebase database
const myDatabase = getDatabase(app);

// Creating references to the 'cart' and 'inventory' nodes in the Firebase database
const cartRef = ref(myDatabase, '/cart');
const inventoryRef = ref(myDatabase, '/inventory');

// creating a function to add to database
// const addToDatabase = (key, value) => {
//   const customRef = ref(myDatabase, key);
//   set(customRef, value);
// };

// Selectors for UI elements related to the cart
const cartIcon = document.querySelector('.nav--cart');
const overlay = document.querySelector('.overlay');
const cartDisplay = document.querySelector('.cart');
const cartClose = document.querySelector('.close__cart');

// Functions to open and close the cart overlay
const openCart = function () {
  cartDisplay.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeCart = function () {
  cartDisplay.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Event listeners to open and close the cart overlay
cartIcon.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

// DATA SECTION
// Functions to generate random prices for the initial inventory
const cheapPrice = () => parseFloat(Math.random() * (5 - 1) + 1).toFixed(2);
const expPrice = () => parseFloat(Math.random() * (15 - 10) + 10).toFixed(2);

// Initial inventory of the products
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

// Function to Display the items on the page
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

// Fetch and display the inventory from Firebase
onValue(inventoryRef, function (snapshot) {
  const ourData = snapshot.val();
  // storing the data in inventory variable
  const inventory = ourData;
  displayItems(inventory);
});

// Function to add item to cart when its 'Add To Cart' button is clicked
productGallery.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('btn--cart')) {
    const chosenProductIndex = e.target.attributes.dataindex.value;
    const selectedProductRef = ref(
      myDatabase,
      `/inventory/${chosenProductIndex}`
    );

    get(selectedProductRef).then((snapshot) => {
      const productData = snapshot.val();
      productData.qty = 1;
      push(cartRef, productData);
      recalculateTotalCost();
    });
  }
});

// Function to update the UI
onValue(cartRef, function (snapshot) {
  // When the value changes, update the cart
  const cartData = snapshot.val();
  if (cartData === null) {
    recalculateTotalCost();
  } else {
    updateCart(cartData);
  }
});

// Functions for updating the UI of the cart and recalculating the total cost
const emptyCartMessage = document.querySelector('.cart--empty');
const updateCart = (cartData) => {
  const cartList = document.querySelector('.cart--grid');

  cartList.innerHTML = '';

  if (cartData && Object.keys(cartData).length > 0) {
    emptyCartMessage.classList.add('hidden');
  } else {
    emptyCartMessage.classList.remove('hidden');
  }

  // Storing quantities and prices for the cart total
  const qtyArray = [];
  const costArray = [];

  for (let key in cartData) {
    const item = cartData[key];

    let existingCartItem = cartList.querySelector(`div[data-id="${item.id}"]`);

    if (existingCartItem) {
      let qtyElement = existingCartItem.querySelector(
        '.cart--qty > .cart--text'
      );
      let priceElement = existingCartItem.querySelector('.cart--price');
      item.qty = Number(qtyElement.textContent) + 1;
      item.newPrice = item.price * item.qty;
      qtyElement.textContent = item.qty;
      priceElement.textContent = `$${item.newPrice.toFixed(2)}`;
      recalculateTotalCost();
    } else {
      item.newPrice = item.price * item.qty;
      const newCartItem = document.createElement('div');
      newCartItem.classList.add('cart__product', 'grid');
      newCartItem.setAttribute('data-id', cartData[key].id);
      newCartItem.innerHTML = `
        <img src="${item.src}" alt="image of ${item.productName}" />
        <p class="cart--text">${item.productName}</p>
        <div class="cart--qty">
          <p class="cart--symbol minus">&minus;</p>
          <p class="cart--text">${item.qty}</p>
          <p class="cart--symbol plus">&plus;</p>
        </div>
        <p class="cart--text cart--price">$${item.newPrice.toFixed(2)}</p>
      `;
      cartList.appendChild(newCartItem);

      // Handling click events on plus and minus symbols
      const minusButton = newCartItem.querySelector(
        '.cart--qty > .cart--symbol.minus'
      );
      const plusButton = newCartItem.querySelector(
        '.cart--qty > .cart--symbol.plus'
      );
      const qtyElement = newCartItem.querySelector('.cart--qty > .cart--text');
      const priceElement = newCartItem.querySelector('.cart--price');

      minusButton.addEventListener('click', async () => {
        if (item.qty > 0) {
          item.qty -= 1;
          item.newPrice = item.price * item.qty;
          if (item.qty === 0) {
            await remove(ref(myDatabase, `/cart/${key}`)); // remove item from Firebase
            cartList.removeChild(newCartItem);
          } else {
            update(ref(myDatabase, `/cart/${key}`), { qty: item.qty }); // update quantity in Firebase
            qtyElement.textContent = item.qty;
            priceElement.textContent = `$${item.newPrice.toFixed(2)}`;
          }
          // Always recalculate the total cost after updating Firebase, to ensure we're fetching the latest state of the cart.
          recalculateTotalCost();
        }
      });
      plusButton.addEventListener('click', () => {
        item.qty += 1;
        item.newPrice = item.price * item.qty;
        update(ref(myDatabase, `/cart/${key}`), { qty: item.qty }); // update quantity in Firebase
        qtyElement.textContent = item.qty;
        priceElement.textContent = `$${item.newPrice.toFixed(2)}`;
        recalculateTotalCost();
      });
    }
  }
};

const recalculateTotalCost = async () => {
  const snapshot = await get(cartRef);
  const cartData = snapshot.val();
  const totalCostElement = document.querySelector('.total-cost');

  if (cartData) {
    const costArray = [];

    for (let key in cartData) {
      const item = cartData[key];
      const quantities = item.qty || 0;
      const prices = (parseFloat(item.price) || 0) * quantities;
      costArray.push(prices);
    }

    const totalCost = costArray.reduce((total, curr) => total + curr, 0);
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
  } else {
    totalCostElement.textContent = '$0.00';
  }
};

// // Search bar implementation

const btnSearch = document.querySelector('.product__search');
const searchInput = document.querySelector('[data-search]');
const resetInput = document.querySelector('.product__reset');

// // search function
const searchFunction = (stock, value) => {
  let counter = 0;
  productGallery.innerHTML = '';
  stock.forEach((item, i) => {
    if (item.productName.toLowerCase().includes(value.trim().toLowerCase())) {
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
