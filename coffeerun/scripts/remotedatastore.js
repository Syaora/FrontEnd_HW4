(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.ajax(this.serverUrl, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        emailAddress: val.emailAddress,
        coffee: val.coffee
      }),
      success: function(serverResponse) {
        console.log(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.ajax(this.serverUrl, {
      type: 'GET',
      success: function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'GET',
      success: function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
