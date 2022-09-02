const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
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
        type: [String],
        default: ['USER']
    },
    skills: {
        type: [String],
        default: []
    },
    teams: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.method('comparePassword', async (savedPass, enteredPass) => {
    return await bcrypt.compare(enteredPass, savedPass);
})

const UserModel = mongoose.model('User', userSchema);
module.exports = {
    UserModel
};