var express = require('express');
var router = express.Router();
var admin = require('../controller/admincontroller');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

/* GET home page. */
router.post('/',upload.single('cat_image'),admin.insert);
router.get('/',admin.select);
router.put('/update/:id',admin.update);
router.delete('/delete/:id',admin.delete);
router.post('/login',admin.adminlogin);
router.get('/logout',admin.adminlogout);

// 
router.post('/addpuzzle',admin.insertpuzzle);
router.get('/viewpuzzle',admin.getpuzzle);
router.put('/updatepuzzle',admin.updatepuzzle);
router.delete('/deletepuzzle',admin.deletepuzzle);


module.exports = router;
