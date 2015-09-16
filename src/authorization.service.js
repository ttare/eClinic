'use strict';

angular.module('app')
  .service('authorizationService', function ($cookieStore) {
    var hasLocalStorage = typeof(Storage) !== 'undefined' ? true : false;

    function setDataToLocalStorage (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    function setDataToCookies (key, value) {
      $cookieStore.put(key, value);
    }

    function getDataFromLocalStorage (key) {
      return JSON.parse(localStorage.getItem(key));
    }
    function getDataFromCookies (key) {
      return $cookieStore.get(key);
    }

    function removeDataFromLocalStorage(key) {
      localStorage.removeItem(key);
    }
    function removeDataFromCookies(key) {
      $cookieStore.remove(key);
    }

    var setData = function (key, value) {
      hasLocalStorage ? setDataToLocalStorage(key, value) : setDataToCookies(key, value);
    };

    var getData = function (key) {
      return hasLocalStorage ? getDataFromLocalStorage(key) : getDataFromCookies(key);
    };

    var removeData = function (key) {
      hasLocalStorage ? removeDataFromLocalStorage(key) : removeDataFromCookies(key);
    };

    return {
      setData: setData,
      getData: getData,
      removeData: removeData
    };
  });
