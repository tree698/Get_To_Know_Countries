'use strict';

const items = document.querySelector('.items');
const app = document.querySelector('.app');

loadItems() //
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch((error) => alert('Items are not loaded or Network Error!'));

async function loadItems() {
  const response = await fetch('../Data/data.json');
  const json = await response.json();
  const items = json.items;
  return items;
}

function displayItems(items) {
  items.map((item) => {
    addItem(createItem(item.image, item.gender, item.size));
  });
}

function addItem(item) {
  items.appendChild(item);
}

function createItem(img, gender, size) {
  const item = document.createElement('li');
  item.setAttribute('class', 'item');
  item.innerHTML = `
      <img src=${img} alt="item image" class="item__thumbnail" />
      <span class="item__description">${gender}, ${size}</span>`;
  return item;
}

function setEventListener(items) {
  app.addEventListener('click', (event) => {
    deleteItems();
    switch (event.target.className) {
      case 'menu__img tshirt':
        return onClickTshirt(items);
      case 'menu__img pants':
        return onClickPants(items);
      case 'menu__img skirt':
        return onClickSkirt(items);
      case 'button blue':
        return onClickBlue(items);
      case 'button yellow':
        return onClickYellow(items);
      case 'button pink':
        return onClickPink(items);
      case 'logo':
        return displayItems(items);
      default:
        throw new Error('error');
    }
  });
}

function deleteItems() {
  const toBeDeleted = document.querySelectorAll('.item');
  toBeDeleted.forEach((item) => item.remove());
}

function onClickTshirt(items) {
  const tshirtItem = items.filter((item) => item.type === 'tshirt');
  displayItems(tshirtItem);
}

function onClickPants(items) {
  const pantsItem = items.filter((item) => item.type === 'pants');
  displayItems(pantsItem);
}

function onClickSkirt(items) {
  const skirtItem = items.filter((item) => item.type === 'skirt');
  displayItems(skirtItem);
}

function onClickBlue(items) {
  const blueItem = items.filter((item) => item.color === 'blue');
  displayItems(blueItem);
}

function onClickYellow(items) {
  const yellowItem = items.filter((item) => item.color === 'yellow');
  displayItems(yellowItem);
}

function onClickPink(items) {
  const pinkItem = items.filter((item) => item.color === 'pink');
  displayItems(pinkItem);
}
