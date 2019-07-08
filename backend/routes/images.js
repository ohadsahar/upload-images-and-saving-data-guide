const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageSchema = require("../Models/ImagesSchema");

/* Multer configruiton */
const MIME_TYPE_MAP = {

  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      if(isValid) {
        error = null;
      }
      cb(error, "backend/images"); //backend just images not backend/images cause deploy
  },
    filename: (req, file, cb) => {

      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
    }

});

/* Multer configruiton */

router.post("", multer({storage: storage}).array("images[]", 10), (req,res,next) => {

  let counter = 1;
  var arrayimages = [];
  req.files.forEach(function(value, index) {

    const url  = req.protocol + '://' + req.get('host');
    arrayimages.push(url + "/images/" + value.filename);

    if(counter >= req.files.length) {

      const imagenew = new imageSchema ({
        image: arrayimages
      });

      imagenew.save();
      res.send(imagenew);
      arrayimages = null;
      counter = 0;

    }
    counter++;
  });

  });

  router.get("", (req,res,next) => {
    imageSchema.find().then(documents => {
      res.status(200).json({
          images: documents
      });
    });
  });


  module.exports = router;
