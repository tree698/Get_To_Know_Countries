'use strict';

loadItems() //
  .then((items) => {
    displayItems(items);
    setEventListener();
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

// insert dataset!! instead of class
function createHTMLString(item) {
  return `<li class="item" data-type="${item.type}" data-color="${item.color}">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <p class="item__description">${item.gender} ${item.size}</p>
          </li>`;
}

function setEventListener() {
  const log = document.querySelector('.logo');
  const menu = document.querySelector('.menu');
  const arrayOfItem = document.querySelectorAll('.item');

  log.addEventListener('click', () => displayAllItem(arrayOfItem));
  menu.addEventListener('click', (event) =>
    displayFilteredItem(event, arrayOfItem)
  );
}

function displayAllItem(array) {
  array.forEach((arr) => {
    arr.classList.remove('invisible');
  });
}

function displayFilteredItem(event, array) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  // displayAllItem(array);
  updateItems(array, key, value);
}

function updateItems(array, key, value) {
  array.forEach((arr) => {
    if (arr.dataset[key] === value) {
      arr.classList.remove('invisible');
    } else {
      arr.classList.add('invisible');
    }
  });
}
