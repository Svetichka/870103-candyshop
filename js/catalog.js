'use strict';

// Модуль catalog.js
(function () {
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');
var allGoods;
var templateCard = document.querySelector('#card').content.querySelector('.catalog__card');
var createGoods = function (goods) {
  allGoods = goods;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(createGoodsElement(goods[i], i));
  }
  catalogCards.appendChild(fragment);
};
var createGoodsElement = function (item, i) {
  var itemElement = templateCard.cloneNode(true);
  if (item.amount && item.amount <= 5) {
    itemElement.classList.remove('card--in-stock');
    itemElement.classList.add('card--little');
  } else if (!item.amount) {
    itemElement.classList.remove('card--in-stock');
    itemElement.classList.add('card--soon');
  }
  itemElement.querySelector('.card__btn').dataset.id = i;
  itemElement.querySelector('.card__title').textContent = item.name;
  itemElement.querySelector('.card__img').src = "img/cards/" + item.picture;
  itemElement.querySelector('.card__price').innerHTML = item.price + '<span class="card__currency">₽</span><span class="card__weight">/ '+item.weight + ' Г</span></span>';
  var rating = itemElement.querySelector('.stars__rating');
  if (item.rating) {
    if (item.rating.value === 1) {
      rating.classList.remove('stars__rating--five');
      rating.classList.add('stars__rating--one');
    } else if (item.rating.value === 2) {
      rating.classList.remove('stars__rating--five');
      rating.classList.add('stars__rating--two');
    } else if (item.rating.value === 3) {
      rating.classList.remove('stars__rating--five');
      rating.classList.add('stars__rating--three');
    } if (item.rating.value === 4) {
      rating.classList.remove('stars__rating--five');
      rating.classList.add('stars__rating--four');
    }
    itemElement.querySelector('.star__count').textContent = '(' + item.rating.number + ')';
  }
  if (item.nutritionFacts) {
    if (item.nutritionFacts.sugar) {
      itemElement.querySelector('.card__characteristic').textContent = 'С сахаром (' + item.nutritionFacts.energy + ')';
    } else {
      itemElement.querySelector('.card__characteristic').textContent = 'Без сахара (' + item.nutritionFacts.energy + ')';
    }
    itemElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;
  }

  return itemElement;
};
var showError = function (message) {
  console.error(message);


};
window.backend.getData(createGoods, showError);
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
window.catalog = {
  allGoods: allGoods
}
}());

