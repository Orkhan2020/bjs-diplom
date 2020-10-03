"use strict";

const usForm = new UserForm();

usForm.loginFormCallback = (data) => {
  ApiConnector.login(
    data,
    (response) => {
      if (response.success) {
        location.reload();
      } else {
        usForm.setLoginErrorMessage(response.error);        
      }
    }
  );
};

usForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      usForm.setRegisterErrorMessage(response.error);
    }
  });
};