'use strict';

angular.module('app')
  .service('imageService', function ($rootScope, apiUrl, assetsUrl) {

    function fetchBlob(queryString, callback, device) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrl + queryString, true);
      xhr.responseType = 'arraybuffer';
      xhr.setRequestHeader('Authorization', $rootScope.loggedUser.access_token);

      xhr.onload = function(e) {
        var b64Response;
        if (this.status == 200) {
          var blob = this.response;
          b64Response = 'data:image/png;base64,' + arrayBufferToBase64(blob);

        } else if (this.status == 404) {
          b64Response = assetsUrl + '/no_img.png';
        }
        callback(b64Response);
      };
      xhr.send();
    }

    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }

    return {
      fetchBlob: fetchBlob
    };
  });
