'use strict';

const items = document.querySelector('.items');

loadItems() //
  .then((items) => {
    display(items);
    // setEventHandler(data);
  })
  .catch(console.error);

async function loadItems() {
  const response = await fetch('../Data/data.json');
  const json = await response.json();
  const items = json.items;
  return items;
}

function display(items) {
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
