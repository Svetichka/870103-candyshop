'use strict';
// Модуль backend.js
(function() {
  var GET_DATA = "https://js.dump.academy/candyshop/data";
  var SEND_DATA = "https://js.dump.academy/candyshop";
  var TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;

  /**
   * Функция создания XHR - объекта
   * @param {callback} onLoad - колбэк для загрузки данных
   * @param {callback} onError - колбэк для обработки ошибок
   */
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.resonseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(JSON.parse(xhr.response));
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс.');
    });
    return xhr;
  };

  /**
   * Функция загрузки данных с сервера
   * @param {callback} onLoad - колбэк для загрузки данных
   * @param {callback} onError - колбэк для обработки ошибок
   */
  var getData = function (onLoad, onError) {
    var getXhr = setupXhr(onLoad, onError);
    getXhr.open('GET', GET_DATA);
    getXhr.send();
  };

  /**
   * Функция отправки данных на сервер
   * @param {callback} onLoad - колбэк для отправки данных
   * @param {callback} onError - колбэк для обработки ошибок
    @param {} data - данные для отправки
   */
  var sendData = function (onLoad, onError, data) {
    var sendXhr = setupXhr(onLoad, onError);
    sendXhr.open('POST', SEND_DATA);
    sendXhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };
}());
