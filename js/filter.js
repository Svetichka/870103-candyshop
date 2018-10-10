'use strict';
// Модуль filter.js
(function () {
 /**
 * Функция изменения цены в фильтре
 * @param {number} pin точка опускания мыши
 * @param {number} price цена
 */
  var changePrice = function (pin, price) {
  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x:moveEvt.clientX
      };
      var pinOffset = pin.offsetLeft - shift.x;
      if (pinOffset >= 0 && pinOffset <= 235) {
        pin.style.left = pinOffset + 'px';
        price.textContent = pinOffset;
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
var pinLeft = document.querySelector('.range__btn--left');
var priceLeft = document.querySelector('.range__price--min');
changePrice(pinLeft, priceLeft);
var pinRight = document.querySelector('.range__btn--right');
var priceRight = document.querySelector('.range__price--max');
changePrice(pinRight, priceRight);

var filterState = {
  foodType: undefined,
  foodProperty: undefined,
  foodPrice: {
    min: 0,
    max: 235
  },
  foodMark: undefined,
  foodSort: 'popular'
}

/**
 * Функция обработки при нажатии фильтра
 * @param {Object} evt объект самого события
 */
var onFilterClick = function (evt) {
  var currentElement = evt.currentTarget;
  var currentFilterName = currentElement.name;
  if (currentElement === 'food-type') {

  }
}

}());
