'use strict';
// Модуль order.js
(function () {
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

