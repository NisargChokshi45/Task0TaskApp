const multer = require("multer");

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload an Image"));
        }
        cb(undefined, true);
    },
});

const uploadFile = (req, res, next) => {
    console.log("Uploading File called");
    upload.single("avatar");
    next();
};

module.exports = uploadFile;
