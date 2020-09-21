'use strict'

let logoutObject = new LogoutButton;
logoutObject.action = function(data) {
    ApiConnector.logout(response => {
        response['success'] ? location.reload() : console.log(response);
    });
};

ApiConnector.current(response => {
    response['success'] ? ProfileWidget.showProfile(response['data']) : console.log(response);
});


function clearAndFillStocksTable(data) {
    let ratesBoardObject = new RatesBoard();
    ratesBoardObject.clearTable();
    ratesBoardObject.fillTable(data);
};

ApiConnector.getStocks(response => {
    response['success'] ? clearAndFillStocksTable(response['data']) : console.log(response);
});

function addMoneyToWallet(object, data) {
    ApiConnector.addMoney(data, response => {
        response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};

let moneyManagerObject = new MoneyManager()
moneyManagerObject.addMoneyCallback = function (data) {
    data ? addMoneyToWallet(moneyManagerObject, data) : console.log(data);
};

function moneyConversation(object, data) {
    ApiConnector.convertMoney(data, response => {
        response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};
moneyManagerObject.conversionMoneyCallback = function (data) {
    data ? moneyConversation(moneyManagerObject, data) : console.log(data);
};

function transferMoneyToFavorites(object, data) {
    ApiConnector.transferMoney(data, response => {
       response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};

moneyManagerObject.sendMoneyCallback = function (data) {
    data ? transferMoneyToFavorites(moneyManagerObject, data) : console.log(data);
};

function showFavorites(object, data) {
    object.clearTable();
    object.fillTable(data);
    moneyManagerObject.updateUsersList(data);
};

let favoritesObject = new FavoritesWidget()
ApiConnector.getFavorites(response => {
    response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
});

function getIntId(data) {
    data['id'] ? data['id'] = parseInt(data['id']): data['id'];
}

favoritesObject.addUserCallback = function (data) {
    getIntId(data);
    ApiConnector.addUserToFavorites(data, response => {
        response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
    });
};

favoritesObject.removeUserCallback = function (data) {
    getIntId(data);
    ApiConnector.removeUserFromFavorites(data, response => {
        response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
    });
};