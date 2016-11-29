"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, null, [{
    key: "onUnauthorizedRequest",
    value: function onUnauthorizedRequest(response) {
      AuthCtrl.onUnauthorizedRequest(response);
    }
  }, {
    key: "_onRequestErrorHandler",
    value: function _onRequestErrorHandler(response) {
      if (response.status == 401) {
        Api.onUnauthorizedRequest(response.responseJSON);
      }
      Api.onRequestError(response);
    }
  }, {
    key: "onRequestError",
    value: function onRequestError(response) {}
  }, {
    key: "onRequestSuccess",
    value: function onRequestSuccess(response) {}
  }, {
    key: "put",
    value: function put() {
      var url = arguments.length <= 0 ? undefined : arguments[0];

      var _Api$parseRequestArgu = Api.parseRequestArguments.apply(Api, arguments),
          data = _Api$parseRequestArgu.data,
          callbackSucess = _Api$parseRequestArgu.callbackSucess,
          callbackError = _Api$parseRequestArgu.callbackError;

      return Api.request("PUT", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "request",
    value: function request(type, url, data, callbackSucess, callbackError) {
      return jQuery.ajax({
        url: url,
        data: data,
        // if you use jquery_ujs you don't need this
        // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        type: type,
        dataType: 'json',
        success: function success(response) {
          Api.onRequestSuccess(response);
          if (callbackSucess) {
            callbackSucess(response);
          }
        },
        error: function error(response) {
          Api._onRequestErrorHandler(response);
          if (callbackSucess) {
            callbackError(response);
          }
        }
      });
    }
  }, {
    key: "parseRequestArguments",
    value: function parseRequestArguments() {
      if (Api.isFunction(arguments.length <= 1 ? undefined : arguments[1])) {
        return { data: undefined, callbackSucess: arguments.length <= 1 ? undefined : arguments[1], callbackerror: arguments.length <= 2 ? undefined : arguments[2] };
      } else {
        return { data: arguments.length <= 1 ? undefined : arguments[1], callbackSucess: arguments.length <= 2 ? undefined : arguments[2], callbackerror: arguments.length <= 3 ? undefined : arguments[3] };
      }
    }
  }, {
    key: "isFunction",
    value: function isFunction(argument) {
      jQuery.isFunction(argument);
    }
  }]);

  return Api;
}();

exports.default = Api;
