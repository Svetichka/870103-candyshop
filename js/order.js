'use strict';
// Модуль order.js
(function () {
var templateCard = document.querySelector('#card').content.querySelector('.catalog__card');
var items = generateCommodities(GOODS_COUNT, NAMES, PICTURES, FOODS);
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
 * Проверка алгоритмом луны
 * @param {string} cardNumber номер кредитной карты
 * @return {boolean} правильность заполнения карты
 */
var checkCard = function (cardNumber) {
  var cardNumberArray = cardNumber.split('');
  var sum = 0;
  if (cardNumberArray.length !== 16) {
    return false;
  }
  for (var i = 0; i < cardNumberArray.length; i++) {
    cardNumberArray[i] = parseInt(cardNumberArray[i], 10);
    if (i % 2 === 0) {
      cardNumberArray[i] *= 2;
    }
    if (cardNumberArray[i] > 9) {
      cardNumberArray[i] -= 9;
    }
    sum += cardNumberArray[i];
  }
  return (sum % 10 === 0);
}
}());

