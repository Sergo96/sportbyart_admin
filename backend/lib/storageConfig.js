const multer = require('multer');

const storageConfig = (upload) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, upload);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
        }
    });
}

module.exports = storageConfig;