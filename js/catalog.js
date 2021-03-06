'use strict';

// Модуль catalog.js
(function () {
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var templateCard = document.querySelector('#card').content.querySelector('.catalog__card');
var items = window.data.items;
for (var i = 0; i < items.length; i++) {
  var itemElement = templateCard.cloneNode(true);
  if (items[i].amount && items[i].amount <= 5) {
    itemElement.classList.remove('card--in-stock');
    itemElement.classList.add('card--little');
  } else if (!items[i].amount) {
    itemElement.classList.remove('card--in-stock');
    itemElement.classList.add('card--soon');
  }
  itemElement.querySelector('.card__btn').dataset.id = i;
  itemElement.querySelector('.card__title').textContent = items[i].name;
  itemElement.querySelector('.card__img').src = items[i].picture;
  itemElement.querySelector('.card__price').innerHTML = items[i].price + '<span class="card__currency">₽</span><span class="card__weight">/ '+items[i].weight + ' Г</span></span>';
  var rating = itemElement.querySelector('.stars__rating');
  if (items[i].rating.value === 1) {
    rating.classList.remove('stars__rating--five');
    rating.classList.add('stars__rating--one');
  } else if (items[i].rating.value === 2) {
    rating.classList.remove('stars__rating--five');
    rating.classList.add('stars__rating--two');
  } else if (items[i].rating.value === 3) {
    rating.classList.remove('stars__rating--five');
    rating.classList.add('stars__rating--three');
  } if (items[i].rating.value === 4) {
    rating.classList.remove('stars__rating--five');
    rating.classList.add('stars__rating--four');
  }
  itemElement.querySelector('.star__count').textContent = '(' + items[i].rating.number + ')';
  if (items[i].nutritionFacts.sugar) {
    itemElement.querySelector('.card__characteristic').textContent = 'С сахаром (' + items[i].nutritionFacts.energy + ')';
  } else {
    itemElement.querySelector('.card__characteristic').textContent = 'Без сахара (' + items[i].nutritionFacts.energy + ')';
  }
  itemElement.querySelector('.card__composition-list').textContent = items[i].nutritionFacts.contents;
  catalogCards.appendChild(itemElement);
}

var cart = document.querySelector('.goods__cards');
var favoriteBtns = document.querySelectorAll('.card__btn-favorite');
for (var i = 0; i < favoriteBtns.length; i++) {
  favoriteBtns[i].addEventListener('click', function (e) {
    e.preventDefault();
    e.currentTarget.classList.toggle('card__btn-favorite--selected');

  });
}
var cartBtns = document.querySelectorAll('.card__btn');
for (var i = 0; i < cartBtns.length; i++) {
  cartBtns[i].addEventListener('click', function (e) {
    e.preventDefault();
    var itemId = e.currentTarget.dataset.id;
    var item = items[itemId];
    addFoodToCart(item);
  });
}

/**
 * Функция добавления товара в корзину
 * @param {Object} item объект товара
 */
var addFoodToCart = function (item) {
  cart.classList.remove('goods__cards--empty');
  document.querySelector('.goods__card-empty').classList.add('visually-hidden');
  var templateCardOrder = document.querySelector('#card-order').content.querySelector('.card-order');
  var orderElement = templateCardOrder.cloneNode(true);
  orderElement.querySelector('.card-order__title').textContent = item.name;
  orderElement.querySelector('.card-order__img').src = item.picture;
  orderElement.querySelector('.card-order__price').innerHTML = item.price + '<span class="card__currency">₽</span><span class="card__weight">/ '+item.weight + ' Г</span></span>';
  cart.appendChild(orderElement);
}
}());

