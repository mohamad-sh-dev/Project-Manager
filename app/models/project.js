const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان پروژه مورد نیاز میباشد']
    },
    description: {
        type: String
    },
    image: {
        type: String,
        defualt : '/uploads/projects/default.png'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: [true, 'نام مالک پروژه مورد نیاز میباشد']
    },
    team: {
        type: mongoose.Types.ObjectId
    },
    isPublic: {
        type: Boolean,
        default : true
    }
}, {
    timestamps: true
});

const ProjectModel = mongoose.model('Project' , ProjectSchema);
module.exports ={
    ProjectModel
};