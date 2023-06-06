import { totalInventory } from './database.js';
// ('use strict');

// HAMBURGER MENU

// create a hamburger drop-down menu

// add eventlistener to the hamburger menu

const hamburger = document.querySelector('.nav--burger');
const navMenu = document.querySelector('.navbar__list');
const main = document.querySelector('#main--section');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('navbar__list--active');
});

// clicking anywhere except header closes the menu
main.addEventListener('click', () => {
  navMenu.classList.remove('navbar__list--active');
});

// **************************************************************************

// IMAGE CAROUSEL

const leftBtn = document.querySelector('.leftScroll');
const rightBtn = document.querySelector('.rightScroll');
const imgContainer = document.querySelector('.image__slider');
const images = imgContainer.querySelectorAll('img');

// Reset the slider
imgContainer.innerHTML = '';
// start with first image
imgContainer.appendChild(images[0]);

function showNextImage() {
  // create an array from images that allow of indexOf method to get the current image index
  const currentImgIndex = Array.from(images).indexOf(imgContainer.firstChild);

  let nextImg;
  // Changed if to ternary operator as it looks way cooler
  currentImgIndex === images.length - 1
    ? // loop to first
      (nextImg = images[0])
    : // go to next image in the array
      (nextImg = images[currentImgIndex + 1]);

  // clear the current image
  imgContainer.innerHTML = '';
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
  imgContainer.innerHTML = '';
  // add the previous image
  imgContainer.appendChild(prevImg);
}

rightBtn.addEventListener('click', showNextImage);
leftBtn.addEventListener('click', showPrevImage);
