const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'نام مورد نیاز میباشد']
    },
    lastName: {
        type: String,
        required: [true, 'نام خانوادگی شما مورد نیاز میباشد']
    },
    username: {
        type: String,
        required: [true, 'نام کاربری مورد نیاز میباشد'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'رمز عبور مورد نیاز میباشد']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'تکرار رمز عبور مورد نیاز میباشد']
    },
    email: {
        type: String,
        required: [true, 'رایانامه مورد نیاز میباشد'],
        unique: true
    },
    mobileNumber: {
        type: String,
        required: [true, 'شماره همراه مورد نیاز میباشد']
    },
    roles: {
        type: String,
        defualt: ['USER']
    },
    skills: {
        type: String,
        default: []
    },
    teams: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User' , UserSchema);
module.exports ={
    UserModel
};