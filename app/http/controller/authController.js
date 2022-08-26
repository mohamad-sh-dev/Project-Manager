class AuthController {
    register(request , response , next) {
        return response.status(200).json({
            status : 'success' ,
            data : request.body
        })
    };  

    
    login() {};
    removeUserFromTeam() {};
    forgetPassword() {};
    resetPassword() {};
}

module.exports = {
    AuthController: new AuthController()
}