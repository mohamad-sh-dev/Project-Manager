const multer = require('multer'); 
const {v4} = require('uuid') ;
const path = require('path') ;
const storage = multer.diskStorage({
    destination : function (req , file , cb){
        // eslint-disable-next-line no-undef
        cb(null , path.join(__dirname , '/../../../../public/uploads'))
    },
    filename : function(req , file , cb) {
        const uniqueFilename = `${file.fieldname}-${v4()}.jpg` ;
        cb(null ,uniqueFilename )
    }
})

exports.upload = multer({storage})