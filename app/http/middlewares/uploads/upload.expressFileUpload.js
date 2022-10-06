const {
    v4
} = require('uuid');
const path = require('path');
exports.manageUpload = function (request, response, next) {
    try {
        const image = request.files.image
        const seperator = path.sep;
        // eslint-disable-next-line no-undef
        const fileRoot = `${path.join(__dirname, `${seperator}..${seperator}..${seperator}..${seperator}..${seperator}public${seperator}uploads${seperator}image-${v4()}.jpg`)}`
        image.mv(fileRoot, (err) => {
            if (err) throw (err);
            request.body.image = request.files.image;
            request.body.image.image_path = fileRoot.substring(fileRoot.search('uploads'));
            next();
        })
    } catch (error) {
        next(error)
    }
}