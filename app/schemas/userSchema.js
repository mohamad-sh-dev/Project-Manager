const registerUserSchema = {
  title: 'user',
  $id: 'user',
  type: 'object',
  properties: {
    username: {
      title: 'username',
      '$id': '#user/username',
      type: 'string',
      minLength: 8,
      pattern: '^[A-Za-z][A-Za-z0-9_]{7,29}$',
      errorMessage: {
        pattern: 'نام کاربری معتبر نمیباشد',
        minLength: 'نام کاربری باید حداقل دارای هشت کاراکتر باشد'
      }
    },
    firstName: {
      title: 'firstName',
      '$id': '#user/firstName',
      type: 'string'
    },
    lastName: {
      title: 'lastName',
      '$id': '#user/lastName',
      type: 'string'
    },

    mobileNumber: {
      title: 'mobileNumber',
      '$id': '#user/mobileNumber',
      type: 'string',
      pattern: '^(\\+98|0)?9\\d{9}$',
      errorMessage: {
        pattern: 'شماره همراه معتبر نمیباشد'
      }
    },
    email: {
      title: 'email',
      '$id': '#user/email',
      type: 'string',
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$',
      errorMessage: {
        pattern: 'ایمیل نا معتبر است'
      }
    },
    password: {
      title: 'password',
      '$id': '#user/password',
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      errorMessage: {
        pattern: 'رمز عبور باید حداقل شامل یک حرف و یک عدد باشد',
        minLength: 'رمز عبور باید حداق هشت کاراکتر باشد'
      }
    },
    passwordConfirm: {
      title: 'passwordConfirm',
      '$id': '#user/passwordConfirm',
      type: 'string',
      const: {
        '$data': '1/password'
      },
      errorMessage: {
        const: 'تایید پسورد ناهمسان است'
      }
    },
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند"
  },
  additionalProperties: false,
  required: ['username', 'email', 'mobileNumber', 'password', 'passwordConfirm']
}
const loginUserSchema = {
  title: 'login',
  $id: 'loginSchema',
  type: 'object',
  properties: {
    email: {
      title: 'email',
      '$id': '#loginSchema/email',
      type: 'string',
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$',
      errorMessage: {
        pattern: 'ایمیل نا معتبر است'
      }
    },
    password: {
      title: 'password',
      '$id': '#user/password',
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      errorMessage: {
        pattern: 'رمز عبور باید حداقل شامل یک حرف و یک عدد باشد',
        minLength: 'رمز عبور باید حداق هشت کاراکتر باشد'
      }
    }
  },
  errorMessages: {
    type: "داده های ورودی نا معتبرند"
  },
  additionalProperties: false,
  required: ['email']
}
const editProfileSchema = {
  title: 'profile',
  $id: 'editProfileSchema',
  type: 'object',
  properties: {
    firstName: {
      title: 'firstName',
      $id: '#editProfileSchema/firstName',
      type: 'string'
    },
    lastName: {
      title: 'lastName',
      $id: '#editProfileSchema/lastName',
      type: 'string'
    },
    skills: {
      title: 'skills',
      $id: '#editProfileSchema/skills',
      type: 'array' ,
      items : {
        type : 'string' 
      }
    },
    mobileNumber: {
      title: 'mobileNumber',
      $id: '#editProfileSchema/mobileNumber',
      type: 'string',
      pattern: '^(\\+98|0)?9\\d{9}$',
      errorMessage: {
        pattern: 'شماره همراه معتبر نمیباشد'
      }
    },
  },
  additionalProperties: false,
  required: [],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: 'داده های غیر مجاز',
  },
}
const uploadProfilePhoto = {
  title: 'uploadPhoto',
  $id: 'uploadPhotoSchema',
  type: 'object',
  properties: {
    fieldname: {
      title: 'fieldname',
      $id: '#uploadPhotoSchema/fieldname',
      type: 'string'
    },
    originalname: {
      title: 'originalname',
      $id: '#uploadPhotoSchema/originalname',
      type: 'string'
    },
    encoding: {
      title: 'encoding',
      $id: '#uploadPhotoSchema/encoding',
      type: 'string'
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
    destination: {
      title: 'destination',
      $id: '#uploadPhotoSchema/destination',
      type: 'string'
    },
    filename: {
      title: 'filename',
      $id: '#uploadPhotoSchema/filename',
      type: 'string'
    },
    path: {
      title: 'path',
      $id: '#uploadPhotoSchema/path',
      type: 'string'
    },
    size: {
      title: 'size',
      $id: '#uploadPhotoSchema/size',
      type: 'number',
      maximum : 2 *1024*1024 ,
      errorMessage: {
        maximum: 'حجم فایل نمیتواند بیشتر از 2 مگابایت باشد'
      }
    },
  },
  additionalProperties: false,
  required: [],
  errorMessage: {
    type: "داده های ورودی نا معتبرند",
    additionalProperties: 'داده های غیر مجاز',
  },
}

module.exports = {
  registerUserSchema,
  loginUserSchema,
  editProfileSchema,
  uploadProfilePhoto
}