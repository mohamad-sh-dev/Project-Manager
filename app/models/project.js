const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان پروژه مورد نیاز میباشد']
    },
    description: {
        type: String
    },
    projectImage: {
        type: String,
        default: '/uploads/projects/default.png'
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: [true, 'نام مالک پروژه مورد نیاز میباشد']
    },
    team: {
        type: mongoose.Types.ObjectId
    }, 
    tags : {
        type : [String] ,
        default : []
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