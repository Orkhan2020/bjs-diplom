"use strict";

let authObject = new UserForm;
authObject.loginFormCallback = function(data){
 ApiConnector.login(data, response =>{
	 response['success'] ? location.reload() : authObject.setLoginErrorMessage(response['data']);
    });
};


authObject.registerFormCallback = function(data){
 ApiConnector.register(data, response =>{
	 response['success'] ? location.reload() : authObject.setRegisterErrorMessage(response['data']);
    });
};
