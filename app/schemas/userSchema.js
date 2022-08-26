const Ajv = require('ajv');
const ajv = new Ajv({
  allErrors: true,
  $data: true,
  errorMessage: true
})

const userSchema = {
  title: 'user',
  $id: 'user',
  type: 'object',
  properties: {
    username: {
      title: 'username',
      '$id': '/user/username',
      type: 'string',
      minLength: 8,
      pattern: '^[A-Za-z][A-Za-z0-9_]{7,29}$',
      errorMessage: {
        pattern: 'نام کاربری معتبر نمیباشد',
        minLength: 'نام کاربری باید حداقل دارای هشت کاراکتر باشد'
      }
    },
    mobileNumber: {
      title: 'mobileNumber',
      '$id': '/user/mobileNumber',
      type: 'string',
      pattern: '^(\\+98|0)?9\\d{9}$',
      errorMessage: {
        pattern: 'شماره همراه معتبر نمیباشد'
      }
    },
    email: {
      title: 'email',
      '$id': '/user/email',
      type: 'string',
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$',
      errorMessage: {
        pattern: 'ایمیل نا معتبر است'
      }
    },
    password: {
      title: 'password',
      '$id': '/user/password',
      type: 'string',
      minLength : 8, 
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      errorMessage: {
        pattern: 'رمز عبور باید حداقل شامل یک حرف و یک عدد باشد' ,
        minLength : 'رمز عبور باید حداق هشت کاراکتر باشد'
      }
    },
    passwordConfirm: {
      title: 'passwordConfirm',
      '$id': '/user/passwordConfirm',
      type: 'string',
      const: {
        '$data': '1/password'
      },
      errorMessage: {
        const: 'تایید پسورد ناهمسان است'
      }
    },
  },
  errorMessages : {
    type : "داده های ورودی نا معتبرند"
  },
  additionalProperties: false,
  required: ['username', 'email', 'mobileNumber', 'password', 'passwordConfirm']
}

module.exports = {
  userSchema
}