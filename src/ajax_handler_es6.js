class Api {
  static onUnauthorizedRequest(response){
    AuthCtrl.onUnauthorizedRequest(response)
  }
  static _onRequestErrorHandler(response){
    if(response.status == 401){
      Api.onUnauthorizedRequest(response.responseJSON)
    }
    Api.onRequestError(response)
  }
  static onRequestError(response){ }
  static onRequestSuccess(response){ }

  static put(...agrs){
    const url = agrs[0]
    const {data, callbackSucess, callbackError } = Api.parseRequestArguments(...agrs)
    return Api.request("PUT", url, data, callbackSucess, callbackError )
  }

  static request(type, url, data, callbackSucess, callbackError){
    return jQuery.ajax({
      url: url,
      data: data,
      // if you use jquery_ujs you don't need this
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: type,
      dataType: 'json',
      success: (response) =>{
        Api.onRequestSuccess(response)
        if(callbackSucess){ callbackSucess(response) }
      },
      error: (response) =>{
        Api._onRequestErrorHandler(response)
        if(callbackSucess){ callbackError(response) }
      }
    });
  }

  static parseRequestArguments = (...agrs) => {
    if( Api.isFunction(agrs[1]) ){
      return { data: undefined, callbackSucess: agrs[1], callbackerror: agrs[2] }
    }else{
      return { data: agrs[1],   callbackSucess: agrs[2], callbackerror: agrs[3] }
    }
  }

  static isFunction(argument){
    jQuery.isFunction(argument)
  }

}
