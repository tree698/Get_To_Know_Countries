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
        return displaySelectedItems(items, 'type', 'tshirt');
      case 'menu__img pants':
        return displaySelectedItems(items, 'type', 'pants');
      case 'menu__img skirt':
        return displaySelectedItems(items, 'type', 'skirt');
      case 'button blue':
        return displaySelectedItems(items, 'color', 'blue');
      case 'button yellow':
        return displaySelectedItems(items, 'color', 'yellow');
      case 'button pink':
        return displaySelectedItems(items, 'color', 'pink');
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

function displaySelectedItems(items, key, itemValue) {
  const selectedItems = items.filter((item) => item[key] === itemValue);
  displayItems(selectedItems);
}
