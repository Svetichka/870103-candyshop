'use strict';
// Модуль data.js
(function () {
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

window.data.items = generateCommodities(GOODS_COUNT, NAMES, PICTURES, FOODS);

}());

