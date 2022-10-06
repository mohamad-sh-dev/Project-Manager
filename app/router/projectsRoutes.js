const {
    Router
} = require('express');
const fileUpload = require('express-fileupload');
const {
    ProjectController
} = require('../http/controller/projectsController');
const {
    authentication
} = require('../http/middlewares/authentication');
const {
    createProjectDataValidation,
    removeProjectDataValidation,
    updateProjectDataValidation,
    updateProjectImageDataValidation
} = require('../http/middlewares/dataValidation');
const {
    manageUpload
} = require('../http/middlewares/uploads/upload.expressFileUpload');
const router = new Router();

router.post('/create', fileUpload({
    limits: 2 * 1024 * 1024,
    debug: true
}), authentication, manageUpload, createProjectDataValidation, ProjectController.createProject)
router.get('/', authentication, ProjectController.getAllProject)
router.get('/:id', authentication, ProjectController.getProjectById)
router.put('/:id', authentication, updateProjectDataValidation, ProjectController.updateProjects)

router.put('/image/:id', fileUpload({
    limits: 2 * 1024 * 1024,
    debug: true
}), authentication, manageUpload, updateProjectImageDataValidation, ProjectController.updateProjects)

router.delete('/:id', authentication, removeProjectDataValidation, ProjectController.removeProject)

module.exports = {
    projectRoutes: router
}