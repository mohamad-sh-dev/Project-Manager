const {
    Router
} = require('express');
const { AuthController } = require('../http/controller/authController');
const { dataValidation } = require('../http/middlewares/dataValidation');
const router = new Router();

router.post('/signup' ,dataValidation ,AuthController.register )

module.exports = {
    userRoutes: router
}