'use strict';

var GOODS_COUNT = 26;
var PICTURES = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg',
];
var NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var FOODS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо',
];

/**
 * Функция генерации случ. числа в заданном диапазоне
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число из заданного диапазона
 */
var generateRandomNumber = function (min, max) {
  return Math.round(Math.random() * max + min);
};

/**
 * Функция для генерации строки состава
 * @param {Array} foods массив продуктов
 * @return {string} строка с составом
 */
var generateFoods = function (foods) {
  var countFoods = generateRandomNumber(1, foods.length - 1);
  var newFoods = foods.slice(countFoods);
  return newFoods.join(', ');
};

/**
 * Функция генерации массива товаров
 * @param {number} count количество товаров
 * @param {Array} names массив имен
 * @param {Array} pictures массив наших изображений
 * @param {Array} foods массив продуктов
 * @return {Array} массив товаров
 */
var generateCommodities = function (count, names, pictures, foods) {
  var commodities = [];
  for (var i = 0; i < count; i++) {
    commodities[i] = {
      name: names[generateRandomNumber(0, names.length - 1)],
      picture: 'img/cards/' + pictures[generateRandomNumber(0, pictures.length - 1)],
      amount: generateRandomNumber(0, 20),
      price: generateRandomNumber(100, 1500),
      weight: generateRandomNumber(30, 300),
      rating: {
        value: generateRandomNumber(1, 5),
        number: generateRandomNumber(10, 900),
      },
      nutritionFacts: {
        sugar: !!generateRandomNumber(0, 1),
        energy: generateRandomNumber(70, 500),
        contents: generateFoods(foods),
      }
    };
  }
  return commodities;
};

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

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
};

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
