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
  const nav = document.querySelector('.nav');

  log.addEventListener('click', () => {
    const allOfItem = document.querySelectorAll(`.item`);
    allOfItem.forEach((item) => {
      item.classList.remove('display');
    });
  });
  nav.addEventListener('click', (event) => onButtonClick(event));
}

function onButtonClick(event) {
  const value = event.target.dataset.value;
  if (value == null) {
    return;
  }

  const allOfItem = document.querySelectorAll(`.item`);
  allOfItem.forEach((item) => {
    item.classList.remove('display');
    const getArrayOfClassName = item.getAttribute('class').split(' ');
    if (!getArrayOfClassName.includes(value)) {
      item.classList.add('display');
    }
  });
}
