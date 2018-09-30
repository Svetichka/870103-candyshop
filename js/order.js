'use strict';

/**
 * Проверка алгоритмом луны
 * @param {string} cardNumber номер кредитной карты
 * @return {boolean} правильность заполнения карты
 */
(var checkCard = function (cardNumber) {
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
})();

