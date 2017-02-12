export default class AjaxHandler {
  static get(...agrs){
    const {url, data, callbackSucess, callbackError } = Api._parseRequestArguments(...agrs)
    return Api._request("GET", url, data, callbackSucess, callbackError )
  }

  static post(...agrs){
    const {url, data, callbackSucess, callbackError } = Api._parseRequestArguments(...agrs)
    return Api._request("POST", url, data, callbackSucess, callbackError )
  }

  static put(...agrs){
    const {url, data, callbackSucess, callbackError } = Api._parseRequestArguments(...agrs)
    return Api._request("PUT", url, data, callbackSucess, callbackError )
  }

  static delete(...agrs){
    const {url, data, callbackSucess, callbackError } = Api._parseRequestArguments(...agrs)
    return Api._request("DELETE", url, data, callbackSucess, callbackError )
  }

  static onRequestUnauthorized(response){ }

  static onRequestError(response){ }

  static onRequestSuccess(response){ }

  static _onRequestErrorHandler(response){
    if(response.status == 401){
      Api.onRequestUnauthorized(response.responseJSON, response)
    }
    Api.onRequestError(response)
  }

  static _request(type, url, data, callbackSucess, callbackError){
    return jQuery.ajax({
      url: url,
      data: data,
      // if you use jquery_ujs you don't need this
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: type,
      dataType: 'json',
      success: function(response) {
        Api.onRequestSuccess(response)
        if(callbackSucess){ callbackSucess(response) }
      },
      error: (response) => {
        Api._onRequestErrorHandler(response)
        if(callbackError){ callbackError(response) }
      }
    });
  }

  static _parseRequestArguments(...agrs) {
    if (Api._isFunction(agrs[1])) {
      return {
        url: agrs[0],
        callbackSucess: agrs[1],
        callbackerror: agrs[2]
      }
    } else {
      return {
        url: agrs[0],
        data: agrs[1],
        callbackSucess: agrs[2],
        callbackerror: agrs[3]
      }
    }
  }

  static _isFunction(argument) {
    return jQuery.isFunction(argument)
  }
}