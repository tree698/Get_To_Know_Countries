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

function createHTMLString(item) {
  return `<li class="item ${item.type} ${item.color}">
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
  const value = event.target.dataset.value;
  if (value == null) {
    return;
  }
  displayAllItem(array);
  array.forEach((arr) => {
    const getArrayOfClassName = arr.getAttribute('class').split(' ');
    if (!getArrayOfClassName.includes(value)) {
      arr.classList.add('invisible');
    }
  });
}
