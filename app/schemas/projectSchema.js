const createProjectSchema = {
    title: 'createProject',
    $id: 'createProject',
    type: 'object',
    properties: {
        title: {
            title: 'title',
            '$id': '#createProject/title',
            type: 'string',
            minLength: 8,
            pattern: '^[A-Za-z][A-Za-z0-9_]{7,29}$',
            errorMessage: {
                pattern: 'عنوان پروژه معتبر نمیباشد',
                minLength: 'عنوان پروژه باید حداقل دارای هشت کاراکتر باشد'
            }
        },
        description: {
            title: 'description',
            '$id': '#createProject/description',
            type: 'string'
        },
        tags: {
            title: 'tags',
            '$id': '#createProject/tags',
            type: 'array',
            items: {
                type: 'string',
                minimum: 1,
                maximum: 10,
                pattern: '^#',
                errorMessage: {
                    pattern: 'علامت شارپ باید در ابتدای برچسب قرار گیرد',
                    minimum: 'حداقل یک برچسب لازم است',
                    maximum: 'برچسب ها حداکثر میتوانند 10 عدد باشند'
                }
            }
        },
        image: {
            title: 'image',
            $id: '#createProject/image',
            type: 'object',
            properties: {
                name: {
                    title: 'name',
                    $id: '#createProject/image/name',
                    type: 'string',
                },
                data: {
                    title: 'data',
                    $id: '#createProject/image/data'
                },
                size: {
                    title: 'size',
                    $id: '#createProject/image/size',
                    type: 'number',
                    maximum: 2 * 1024 * 1024,
                    errorMessage: {
                        maximum: 'حجم فایل نمیتواند بیشتر از 2 مگابایت باشد'
                    }
                },
                mimetype: {
                    title: 'mimetype',
                    $id: '#uploadPhotoSchema/mimetype',
                    type: 'string',
                    enum: ['image/jpeg', 'image/jpg', 'image/png'],
                    errorMessage: {
                        enum: 'فرمت فایل معتبر نمیباشد'
                    }
                },
            },
            required: [],
            additionalProperties: true
        },
    },
    errorMessages: {
        type: "داده های ورودی نا معتبرند"
    },
    additionalProperties: false,
    required: ['description', 'title', 'tags'],
    errorMessage: {
        type: "داده های ورودی نا معتبرند",
        additionalProperties: 'داده های غیر مجاز',
        required: 'داده های مورد نیاز'
    },
}
const updateProjectImageSchema = {
    title: 'updateProjectImageSchema',
    $id: 'updateProjectImage',
    type: 'object',
    properties: {
        image: {
            title: 'image',
            $id: '#createProject/image',
            type: 'object',
            properties: {
                name: {
                    title: 'name',
                    $id: '#createProject/image/name',
                    type: 'string',
                },
                data: {
                    title: 'data',
                    $id: '#createProject/image/data'
                },
                size: {
                    title: 'size',
                    $id: '#createProject/image/size',
                    type: 'number',
                    maximum: 2 * 1024 * 1024,
                    errorMessage: {
                        maximum: 'حجم فایل نمیتواند بیشتر از 2 مگابایت باشد'
                    }
                },
                mimetype: {
                    title: 'mimetype',
                    $id: '#uploadPhotoSchema/mimetype',
                    type: 'string',
                    enum: ['image/jpeg', 'image/jpg', 'image/png'],
                    errorMessage: {
                        enum: 'فرمت فایل معتبر نمیباشد'
                    }
                },
            },
            required: [],
            additionalProperties: true
        },
    },
    errorMessages: {
        type: "داده های ورودی نا معتبرند"
    },
    additionalProperties: false,
    required: ['image'],
    errorMessage: {
        type: "داده های ورودی نا معتبرند",
        additionalProperties: 'داده های غیر مجاز',
        required: 'داده های مورد نیاز'
    },
}
const updateProjectSchema = {
    title: 'updateProjectSchema',
    $id: 'updateProject',
    type: 'object',
    properties: {
        title: {
            title: 'title',
            '$id': '#updateProject/title',
            type: 'string',
            minLength: 8,
            pattern: '^[A-Za-z ][A-Za-z0-9_ ]{7,29}$',
            errorMessage: {
                pattern: 'عنوان پروژه معتبر نمیباشد',
                minLength: 'عنوان پروژه باید حداقل دارای هشت کاراکتر باشد'
            }
        },
        description: {
            title: 'description',
            '$id': '#updateProject/description',
            type: 'string'
        },
        tags: {
            title: 'tags',
            $id: '#updateProject/tags',
            type: 'array',
            minItems: 1,
            maxItems: 10,
            items: {
                type: 'string',
                pattern: '^#',
                errorMessage: {
                    pattern: 'علامت شارپ باید در ابتدای برچسب قرار گیرد'
                }
            },
            errorMessage: {
                minItems: 'حداقل یک برچسب لازم است',
                maxItems: 'برچسب ها حداکثر میتوانند 10 عدد باشند'
            }
        }
    },
    errorMessages: {
        type: "داده های ورودی نا معتبرند"
    },
    additionalProperties: false,
    required: ['description', 'title', 'tags'],
    errorMessage: {
        type: "داده های ورودی نا معتبرند",
        additionalProperties: 'داده های غیر مجاز',
        required: 'داده های مورد نیاز'
    },
}
const removeProjectSchema = {
    title: 'removeProjectSchema',
    $id: 'deleteProject',
    type: 'object',
    properties: {
        id: {
            title: 'id',
            '$id': '#deleteProject/id',
            type: 'string',
            minLength: 24,
            maxLength: 24,
            errorMessage: {
                maxLength: 'شناسه پروژه معتبر نیست',
                minLength: 'شناسه پروژه معتبر نیست',
            }
        }
    },
    errorMessages: {
        type: "داده های ورودی نا معتبرند"
    },
    additionalProperties: false,
    required: ['id'],
    errorMessage: {
        type: "داده های ورودی نا معتبرند",
        additionalProperties: 'داده های غیر مجاز',
        required: 'داده های مورد نیاز'
    },
}

module.exports = {
    createProjectSchema,
    removeProjectSchema,
    updateProjectSchema,
    updateProjectImageSchema
}