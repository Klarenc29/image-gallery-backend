var multer = require('multer');
var path = require('path');


// handle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
 });
  
 var upload = multer({ storage: storage });

module.exports = app => {
    const images = require("../controllers/images.controller");
  
    var router = require("express").Router();
  
    // Create a new image
    router.post("/", upload.single('image'), images.create);
  
    // Get images
    router.get("/", images.query);
  
    app.use('/api/images', router);
  };