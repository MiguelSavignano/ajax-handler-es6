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
      var _parseRequestArgument = this._parseRequestArguments.apply(this, arguments),
          url = _parseRequestArgument.url,
          data = _parseRequestArgument.data,
          callbackSucess = _parseRequestArgument.callbackSucess,
          callbackError = _parseRequestArgument.callbackError;

      return this._request("GET", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "post",
    value: function post() {
      var _parseRequestArgument2 = this._parseRequestArguments.apply(this, arguments),
          url = _parseRequestArgument2.url,
          data = _parseRequestArgument2.data,
          callbackSucess = _parseRequestArgument2.callbackSucess,
          callbackError = _parseRequestArgument2.callbackError;

      return this._request("POST", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "put",
    value: function put() {
      var _parseRequestArgument3 = this._parseRequestArguments.apply(this, arguments),
          url = _parseRequestArgument3.url,
          data = _parseRequestArgument3.data,
          callbackSucess = _parseRequestArgument3.callbackSucess,
          callbackError = _parseRequestArgument3.callbackError;

      return this._request("PUT", url, data, callbackSucess, callbackError);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _parseRequestArgument4 = this._parseRequestArguments.apply(this, arguments),
          url = _parseRequestArgument4.url,
          data = _parseRequestArgument4.data,
          callbackSucess = _parseRequestArgument4.callbackSucess,
          callbackError = _parseRequestArgument4.callbackError;

      return this._request("DELETE", url, data, callbackSucess, callbackError);
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
        this.onRequestUnauthorized(response.responseJSON, response);
      }
      this.onRequestError(response);
    }
  }, {
    key: "_request",
    value: function _request(type, url, data, callbackSucess, callbackError) {
      var _this = this;

      return jQuery.ajax({
        url: url,
        data: data,
        // if you use jquery_ujs you don't need this
        // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        type: type,
        dataType: 'json',
        success: function success(response) {
          _this.onRequestSuccess(response);
          if (callbackSucess) {
            callbackSucess(response);
          }
        },
        error: function error(response) {
          _this._onRequestErrorHandler(response);
          if (callbackError) {
            callbackError(response);
          }
        }
      });
    }
  }, {
    key: "_parseRequestArguments",
    value: function _parseRequestArguments() {
      if (this._isFunction(arguments.length <= 1 ? undefined : arguments[1])) {
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
