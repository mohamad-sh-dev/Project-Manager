const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام تیم مورد نیاز میباشد']
    },
    description: {
        type: String
    },
    users: {
        type: [mongoose.Types.ObjectId],
        defualt : []
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