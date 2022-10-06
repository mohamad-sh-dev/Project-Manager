const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام تیم مورد نیاز میباشد']
    },
    summary: {
        type: String
    },
    alias: {
        type: String , 
        unique : true ,
        required : [true , 'نام مستعار مورد نیاز میباشد']
    },
    users: {
        type: [mongoose.Types.ObjectId],
        default : []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: [true, 'نام مالک تیم مورد نیاز میباشد']
    }
}, {
    timestamps: true
});

const TeamModel = mongoose.model('Team' , TeamSchema);
module.exports ={
    TeamModel
};