const {
    UserModel
} = require('../../models/user');
const { createToken } = require('../../modules/functions');

class AuthController {
    async register(request, response, next) {
        try {
            const {
                email
            } = request.body;
            const duplicateUser = await UserModel.findOne({
                email
            });
            if (!duplicateUser) {
                const user = await UserModel.create(request.body);
                return response.status(201).json({
                    status: 'success',
                    data: {
                        id: user._id,
                        username: user.username,
                        createdAt: new Date(user.createdAt).toLocaleDateString()
                    }
                });
            } else {
                return response.status(400).json({
                    status: 'fail',
                    message: 'ایمیل شما تکراری است'
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async login(request, response, next) {
        try {
            const {
                email,
                password
            } = request.body;
            const existUser = await UserModel.findOne({
                email
            }).select('+password') ;
            if (!existUser) return response.status(404).json({
                status: 'fail',
                message: 'مشخصات کاربر یافت نشد'
            })
            if (!(await existUser.comparePassword(existUser.password, password))) return response.status(401).json({
                status: 'fail',
                message: 'نام کاربری یا رمز عبور اشتباه است'
            })

            return response.status(200).json({
                status: 'success',
                data: {
                    token : createToken({
                        email: existUser.email ,
                        username : existUser.username
                })                }
            })

        } catch (error) {
            next(error)
        }
    }
    removeUserFromTeam() {}
    forgetPassword() {}
    resetPassword() {}
}

module.exports = {
    AuthController: new AuthController()
}