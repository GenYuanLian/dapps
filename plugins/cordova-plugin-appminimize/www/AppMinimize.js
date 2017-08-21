var AppMinimize = {
  minimize: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'AppMinimize', 'minimize', []);
  }
};

window.AppMinimize = AppMinimize;
