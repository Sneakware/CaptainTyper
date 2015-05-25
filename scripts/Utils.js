React = require('react');

module.exports = {

  /**
   * Make a request to an external service using a GET xhr
   */
  doRequest (url) {

    return new Promise(function (resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText));
          }
        }
      };

      xhr.onerror = function (e) { reject(new Error(xhr.statusText)); };

      xhr.send();

    });

  }

};
