var express = require('express');
var router = express.Router();
var FilesControllerWeb = require('../controllers/product_web');

var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
router.get('/trangchu',FilesControllerWeb.queryNewProduct)

// router.get('/getNewProduct/:trang', FilesController.getNewProduct);
// router.get('/getNewProduct/:trang', FilesControllerWeb.getNewProduct);
// router.get('/getProductViewMost/:trang', FilesController.getProductViewMost);
// router.get('/getProducts', FilesController.getProducts);
// router.get('/getProduct/:productId', FilesController.getProduct);
// router.get('/getProductType/:typeId/:trang', FilesController.getProductType);
// router.post('/getProductBySearch', FilesController.getProductBySearch);

//
// /*POST*/
// router.post('/uploadFile',upload.single('file'), FilesController.uploadFile);
//
// router.param('fileId', FilesController.queryFile);

module.exports = router;
