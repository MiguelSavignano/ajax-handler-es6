"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxHandler = function () {
  function AjaxHandler() {
    _classCallCheck(this, AjaxHandler);
  }

  _createClass(AjaxHandler, null, [{
    key: "get",
    value: function get() {
      var _Api;

      var _Api$_parseRequestArg = (_Api = Api)._parseRequestArguments.apply(_Api, arguments),
          url = _Api$_parseRequestArg.url,
          data = _Api$_parseRequestArg.data,
          callbackSucess = _Api$_parseRequestArg.callbackSucess,
          callbackError = _Api$_parseRequestArg.callbackError;

      return Api._request("GET", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "post",
    value: function post() {
      var _Api2;

      var _Api$_parseRequestArg2 = (_Api2 = Api)._parseRequestArguments.apply(_Api2, arguments),
          url = _Api$_parseRequestArg2.url,
          data = _Api$_parseRequestArg2.data,
          callbackSucess = _Api$_parseRequestArg2.callbackSucess,
          callbackError = _Api$_parseRequestArg2.callbackError;

      return Api._request("POST", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "put",
    value: function put() {
      var _Api3;

      var _Api$_parseRequestArg3 = (_Api3 = Api)._parseRequestArguments.apply(_Api3, arguments),
          url = _Api$_parseRequestArg3.url,
          data = _Api$_parseRequestArg3.data,
          callbackSucess = _Api$_parseRequestArg3.callbackSucess,
          callbackError = _Api$_parseRequestArg3.callbackError;

      return Api._request("PUT", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _Api4;

      var _Api$_parseRequestArg4 = (_Api4 = Api)._parseRequestArguments.apply(_Api4, arguments),
          url = _Api$_parseRequestArg4.url,
          data = _Api$_parseRequestArg4.data,
          callbackSucess = _Api$_parseRequestArg4.callbackSucess,
          callbackError = _Api$_parseRequestArg4.callbackError;

      return Api._request("DELETE", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "onRequestUnauthorized",
    value: function onRequestUnauthorized(response) {}
  }, {
    key: "onRequestError",
    value: function onRequestError(response) {}
  }, {
    key: "onRequestSuccess",
    value: function onRequestSuccess(response) {}
  }, {
    key: "_onRequestErrorHandler",
    value: function _onRequestErrorHandler(response) {
      if (response.status == 401) {
        Api.onRequestUnauthorized(response.responseJSON, response);
      }
      Api.onRequestError(response);
    }
  }, {
    key: "_request",
    value: function _request(type, url, data, callbackSucess, callbackError) {
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
          if (callbackError) {
            callbackError(response);
          }
        }
      });
    }
  }, {
    key: "_parseRequestArguments",
    value: function _parseRequestArguments() {
      if (Api._isFunction(arguments.length <= 1 ? undefined : arguments[1])) {
        return {
          url: arguments.length <= 0 ? undefined : arguments[0],
          callbackSucess: arguments.length <= 1 ? undefined : arguments[1],
          callbackerror: arguments.length <= 2 ? undefined : arguments[2]
        };
      } else {
        return {
          url: arguments.length <= 0 ? undefined : arguments[0],
          data: arguments.length <= 1 ? undefined : arguments[1],
          callbackSucess: arguments.length <= 2 ? undefined : arguments[2],
          callbackerror: arguments.length <= 3 ? undefined : arguments[3]
        };
      }
    }
  }, {
    key: "_isFunction",
    value: function _isFunction(argument) {
      return jQuery.isFunction(argument);
    }
  }]);

  return AjaxHandler;
}();

exports.default = AjaxHandler;
