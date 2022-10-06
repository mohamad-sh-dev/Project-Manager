const {
    createValidateWithAjv
} = require("../validations/schemaCompile")
const {
    registerUserSchema,
    loginUserSchema,
    editProfileSchema,
    uploadProfilePhoto
} = require('../../schemas/userSchema');
const {
    createProjectSchema,
    updateProjectSchema,
    removeProjectSchema,
    updateProjectImageSchema
} = require("../../schemas/projectSchema");
const { createTeamSchema, updateTeamSchema, inviteUserToTeamSchema, userInviteRequestsActionSchema } = require("../../schemas/teamSchema");

exports.registerDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(registerUserSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            // message: validation.errors
            message: validation.errors.map(error => {
                return {
                    message: error.message,
                    property: error.instancePath
                }
            })
        })
    }
    next()
}
exports.loginUserDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(loginUserSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                return {
                    message: error.message,
                    property: error.instancePath
                }
            })
        })
    }
    next()
}
exports.editProfileDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(editProfileSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.uploadProfilePhotoDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(uploadProfilePhoto, request.file)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.createProjectDataValidation = (request, response, next) => {
    console.log(request.body);
    const validation = createValidateWithAjv(createProjectSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.updateProjectDataValidation = (request, response, next) => {
    console.log(request.body);
    const validation = createValidateWithAjv(updateProjectSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.removeProjectDataValidation = (request, response, next) => {
    console.log(request.params);
    const validation = createValidateWithAjv(removeProjectSchema, request.params)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.updateProjectImageDataValidation = (request, response, next) => {
    console.log(request.params);
    const validation = createValidateWithAjv(updateProjectImageSchema, request.files)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}

exports.createTeamDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(createTeamSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.updateTeamDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(updateTeamSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.inviteUserDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(inviteUserToTeamSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                    return error.params.errors.map(e => {
                        return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }
            })
        })
    }
    next()
}
exports.userInviteRequestsActionDataValidation = (request, response, next) => {
  const validation = createValidateWithAjv(userInviteRequestsActionSchema, request.params);
  if (validation.errors) {
    return response.status(400).json({
      status: "fail",
      message: validation.errors.map((error) => {
        if (error.keyword === "errorMessage") {
          return error.params.errors.map((e) => {
            return {
              message: error.message,
              property: e.params.additionalProperty || e.params.missingProperty,
            };
          });
        } else {
          return {
            message: error.message,
            property: error.instancePath,
          };
        }
      }),
    });
  }
  next();
};