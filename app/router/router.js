const {
    Router
} = require('express');
const { authRoutes } = require('./auth');
const { projectRoutes } = require('./projectsRoutes');
const { teamRoutes } = require('./teamsRoutes');
const {userRoutes} = require('./usersRoutes');

const router = new Router();

router.use('/projects' , projectRoutes);
router.use('/teams' , teamRoutes);
router.use('/users' , userRoutes);
router.use('/auth' , authRoutes);

module.exports = {
    allRoutes: router
}