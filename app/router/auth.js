const {
    Router
} = require('express');
const router = new Router();
const {
    AuthController
} = require('../http/controller/authController');
const {
    registerDataValidation,
    loginUserDataValidation
} = require('../http/middlewares/dataValidation');


router.post('/signup', registerDataValidation, AuthController.register);
router.post('/login', loginUserDataValidation, AuthController.login);

module.exports = {
    authRoutes: router
}