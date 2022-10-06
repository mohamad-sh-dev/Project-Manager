const {
    Router
} = require('express');
const {
    UserController
} = require('../http/controller/usersController');
const {
    authentication
} = require('../http/middlewares/authentication');
const {
    editProfileDataValidation,
    uploadProfilePhotoDataValidation
} = require('../http/middlewares/dataValidation');
const {
    upload
} = require('../http/middlewares/uploads/upload.multer');
const router = new Router();

router.get('/profile', authentication, UserController.getProfile)
router.post('/profile', editProfileDataValidation, authentication, UserController.editProfile)
router.post('/profile/uploadPhoto', authentication, upload.single('image'), uploadProfilePhotoDataValidation, UserController.uploadProfilePhoto)
module.exports = {
    userRoutes: router
}