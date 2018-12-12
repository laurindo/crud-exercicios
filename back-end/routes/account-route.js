const AccountController = require('../controllers/account-controller');

module.exports = {
    start: (app) => {
        app.get('/accounts', AccountController.listAllAccounts);
        app.get('/account/:id', AccountController.listAccountById);
        app.post('/account', AccountController.createAccount);
        app.put('/account', AccountController.updateAccount);
        app.delete('/account', AccountController.deleteAccount);
    }
};
