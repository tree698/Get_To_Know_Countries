'use strict';

loadItems() //
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  });

async function loadItems() {
  const response = await fetch('../data/data.json');
  const json = await response.json();
  const items = json.items;
  return items;
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `<li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <p class="item__description">${item.gender} ${item.size}</p>
          </li>`;
}

function setEventListener(items) {
  const log = document.querySelector('.logo');
  const nav = document.querySelector('.nav');

  log.addEventListener('click', () => displayItems(items));
  nav.addEventListener('click', (event) => onButtonClick(event, items));
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}
