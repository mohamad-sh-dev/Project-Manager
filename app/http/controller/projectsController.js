const {
    ProjectModel
} = require("../../models/project")
const {
    filterObj
} = require('../../modules/functions')

class ProjectController {
    async createProject(request, response, next) {
        try {
            const {
                title,
                description,
                owner = request.user._id,
                projectImage = request.body.image.image_path,
                tags
            } = request.body

            const project = await ProjectModel.create({
                title,
                description,
                owner,
                tags,
                projectImage
            });
            if (project) return response.status(201).json({
                status: 'success',
                message: 'پروژه با موفقیت ایجاد شد'
            })
            return response.status(400).json({
                status: 'fail',
                message: 'ایجاد پروژه با خطا مواجه شد'
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProject(request, response, next) {
        try {
            const projects = await ProjectModel.find({
                owner: request.user._id
            })
            response.status(200).json({
                status: 'success',
                data: projects
            })
        } catch (error) {
            next(error)
        }
    }
    async getProjectById(request, response, next) {
        try {
            const projectId = request.params.id
            const project = await ProjectModel.findById(projectId);
            if (!project) {
                return response.status(404).json({
                    status: 'not found',
                    message: 'پروژه با شناسه وارد شده یافت نشد!'
                })
            }
            response.status(200).json({
                status: 'success',
                data: project
            })
        } catch (error) {
            next(error)
        }
    }
    async removeProject(request, response, next) {
        try {
            const projectId = request.params.id
            const project = await ProjectModel.deleteOne({
                _id: projectId
            });
            if (project.deletedCount > 0) {
                return response.status(204).json({});
            }
            return response.status(404).json({
                status: 'fail',
                message: 'پروژه با شناسه وارد شده وجود ندارد'
            })

        } catch (error) {
            next(error)
        }
    }
    async updateProjects(request, response, next) {
        try {
            const projectId = request.params.id
            const data = filterObj(request.body, ['tags', 'title', 'description'])
            const project = await ProjectModel.findByIdAndUpdate(projectId, data, {
                runValidators: true,
                new: true
            });
            console.log(project);
            if (!project) {
                return response.status(404).json({
                    status: 'fail',
                    message: 'پروژه با شناسه وارد شده وجود ندارد'
                })
            }
            return response.status(200).json({
                status: 'success',
                data: project
            });
        } catch (error) {
            next(error)
        }
    }
    async updateProjectImage(request, response, next) {
        try {
            const projectId = request.params.id
            const image = request.body.image.image_path
            const project = await ProjectModel.updateOne(projectId, {$set : {image} }, {
                runValidators: true,
                new: true
            });
            if (!project) {
                return response.status(404).json({
                    status: 'fail',
                    message: 'پروژه با شناسه وارد شده وجود ندارد'
                })
            }
            return response.status(200).json({
                status: 'success',
                data: project
            });
        } catch (error) {
            next(error)
        }
    }
    getUserProjects() {}
    getTeamProjects() {}
}

module.exports = {
    ProjectController: new ProjectController()
}