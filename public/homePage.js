"use strict";

const LogButton = new LogoutButton();
LogButton.action = (data) => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});
const rates = new RatesBoard();

const receiveCurrencyrates = (data) => {
  ApiConnector.getStocks((response) => {
    rates.clearTable();
    rates.fillTable(response.data);
  });
};
receiveCurrencyrates();
setInterval(receiveCurrencyrates, 60000);

const money = new MoneyManager();
money.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Счет пополнен!");
    } else money.setMessage(response.success, response.error);
  });
};
money.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Конвертация произведена!");
    } else money.setMessage(response.success, response.error);
  });
};

money.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, "Перевод выполнен!");
    } else money.setMessage(response.success, response.error);
  });
};

const favorite = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    money.updateUsersList(response.data);
  }
});

favorite.addUserCallback = (data) => {
  const parsedData = {
    id: parseInt(data.id),
    name: data.name,
  };
  ApiConnector.addUserToFavorites(parsedData, (response) => {
    if (response.success) {
      favorite.clearTable();
      favorite.fillTable(response.data);
      money.updateUsersList(response.data);
      favorite.setMessage(true, "Пользователь добавлен!");
    } else favorite.setMessage(false, response.error);
  });
};

favorite.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favorite.clearTable();
      favorite.fillTable(response.data);
      money.updateUsersList(response.data);
      favorite.setMessage(true, "Пользователь удален!");
    } else favorite.setMessage(false, response.error);
  });
};