const {
    UserModel
} = require('../../models/user');
const {
    verifyJwtToken
} = require('../../modules/functions')
exports.authentication = async (request, response, next) => {
    try {
        let token;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
            token = request.headers.authorization.split(' ')[1];
        }
        if (!token) throw {
            status: 401,
            message: 'لطفا وارد حساب کاربری خود شوید'
        }
        const decodedToken = verifyJwtToken(token);
        if (!decodedToken.username || !decodedToken.email) throw {
            status: 401,
            message: 'لطفا وارد حساب کاربری خود شوید'
        };
        const user = await UserModel.findOne({
            email: decodedToken.email
        }, {
            password: 0,
            __v  : 0
        });
        request.user = user
        next();
    } catch (error) {
        next(error)
    }
}