const util = require("util");
const multer = require("multer");

const maxSize = 2 * 1024 * 1024 * 2014;

const getStorage = (fileType) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // Define the destination directory based on the file type
        
      const destinationDir = __basedir + `/uploads/${fileType}/`;
      cb(null, destinationDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createFileUploadMiddleware = (fileType) => {
  const storage = getStorage(fileType);
  const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
  }).single("file");

  const uploadFileMiddleware = util.promisify(uploadFile);
  return uploadFileMiddleware;
};

module.exports = createFileUploadMiddleware;
