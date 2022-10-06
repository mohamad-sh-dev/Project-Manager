const {
    Router
} = require('express');
const { TeamController } = require('../http/controller/teamsController');
const { authentication } = require('../http/middlewares/authentication');
const { createTeamDataValidation, updateTeamDataValidation, inviteUserDataValidation, userInviteRequestsActionDataValidation } = require('../http/middlewares/dataValidation');
const router = new Router();

router.get('/', authentication,TeamController.getTeamsList) ;
router.get('/user', authentication,TeamController.getMyTeam) ;
router.get('/:id', authentication,TeamController.getTeamById) ;
router.get('/user/invite', authentication,TeamController.inviteRequests)
router.get('/user/invite/:status', authentication,TeamController.getInviteRequestsByStatus)
router.put('/:id', authentication,updateTeamDataValidation,TeamController.updateTeam)
router.post('/', authentication, createTeamDataValidation,TeamController.createTeam)
router.post('/user/invite', authentication,inviteUserDataValidation,TeamController.inviteUserToTeam)
router.put('/user/invite/:requestID/:status',authentication,userInviteRequestsActionDataValidation,TeamController.userInviteRequestsAction)

module.exports = {
    teamRoutes: router
}