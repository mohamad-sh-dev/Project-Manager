const {
    UserModel
} = require("../../models/user");
const {
    filterObj
} = require("../../modules/functions");

class UserController {
    getProfile(request, response, next) {
        try {
            const user = request.user;
            return response.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                mobileNumber: user.mobileNumber,
                skills: user.skills,
                teams: user.teams,
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(request, response, next) {
        try {
            const body = filterObj(request.body, ['firstname', 'lastname', 'skills', 'mobileNumber']);
            const user = await UserModel.updateOne({
                _id: request.user.id
            }, {
                $set: body
            }, {
                runValidators: true,
            })
            if (user.modifiedCount > 0) {
                return response.status(200).json({
                    status: 'success',
                    message: 'اطلاعات بروز رسانی شد'
                })
            } else {
                return response.status(200).json({
                    status: 'fail',
                    message: 'بروز رسانی اطلاعات با خطا مواجه شد'
                })
            }

        } catch (error) {
            next(error);
        }
        // console.log(request.body)
    }
    deActiveAcount() {}
    acceptInvitation() {}
    rejectInvitation() {}
    getUserById() {}
    addSkills() {}
    editSkills() {}
}

module.exports = {
    UserController: new UserController()
}