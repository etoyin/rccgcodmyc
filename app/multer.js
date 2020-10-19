const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, (new Date).valueOf() + "-" + file.originalname);
  }
})


const fileFilter = (req, file, cb) => {
  if(file.mimetype == "image/jpeg"||
    file.mimetype == "image/png"||
    file.mimetype == "image/gif"||
    file.mimetype == "image/jpg" ){
    cb(null, true)
  }
  else{
    cb({message: 'Unsupport file format'});
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

module.exports = upload;