const {
    Router
} = require('express');
const { UserController } = require('../http/controller/usersController');
const { authentication } = require('../http/middlewares/authentication');
const { editProfileDataValidation } = require('../http/middlewares/dataValidation');
const router = new Router();

router.get('/profile' , authentication , UserController.getProfile)
router.post('/profile', editProfileDataValidation, authentication, UserController.editProfile)
module.exports = {
    userRoutes: router
}