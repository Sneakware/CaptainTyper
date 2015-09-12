import Flux from 'flux';

var dispatcher = new Flux.Dispatcher();

var _username = 'Anonymous';

module.exports = {

  /**
   * Return a new dispatcher
   */
  dispatcher () {
    return dispatcher;
  },

  /**
   * Make a request to an external service using a GET xhr
   */
  doRequest (url) {

    return Promise(function (resolve, reject) {

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

  },

  changeUsername (username) {
    _username = username;
  },

  getUsername () {
    return _username;
  },

  /**
   * Get color hexa
   *
   * @param key {String}
   */
  colors (key) {
    return {
      back: '#002b36',
      blue: '#268bd2',
      green: '#859900'
    }[key] || 'red';
  }

};
