var express = require('express');
var router = express.Router();
var FilesControllerWeb = require('../controllers/product_web');
var configDB = require('../config/database.js');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(configDB.url);

var Cart = require('../models/cart');
var Product   = sequelize.import('../models/product');

var multer = require('multer');

var upload = multer({
  dest: 'public/tmp'
});

/*GET*/
// router.get('/trangchu',FilesControllerWeb.queryNewProduct)
router.get('/homepage',FilesControllerWeb.queryProduct)
router.get('/sanpham/:trang',FilesControllerWeb.queryProduct)

router.get('/banhman/:trang',FilesControllerWeb.queryProductMan)
router.get('/banhman',FilesControllerWeb.queryProductMan)

router.get('/banhngot/:trang',FilesControllerWeb.queryProductNgot)
router.get('/banhngot',FilesControllerWeb.queryProductNgot)

router.get('/banhcrepe/:trang',FilesControllerWeb.queryProductCrepe)
router.get('/banhcrepe',FilesControllerWeb.queryProductCrepe)

router.get('/banhtraicay/:trang',FilesControllerWeb.queryProductPizza)
router.get('/banhpizza',FilesControllerWeb.queryProductPizza)

router.get('/banhsukem/:trang',FilesControllerWeb.queryProductSu)
router.get('/banhsukem',FilesControllerWeb.queryProductSu)

router.get('/banhtraicay/:trang',FilesControllerWeb.queryProductFruit)
router.get('/banhtraicay',FilesControllerWeb.queryProductFruit)

router.get('/banhkem/:trang',FilesControllerWeb.queryProductKem)
router.get('/banhkem',FilesControllerWeb.queryProductKem)


router.get('/chitiet/:trang',FilesControllerWeb.queryChitiet)

router.post('/add-to-cart',FilesControllerWeb.addCart)
router.get('/checkout',FilesControllerWeb.giohang);
router.post('/remove',FilesControllerWeb.removeItem);
router.post('/emptycart',FilesControllerWeb.emptyCart)
router.post('/updateCart',FilesControllerWeb.updateCart)
router.post('/dathang',FilesControllerWeb.checkOut)
router.post('/comment',FilesControllerWeb.comment)
router.post('/search',FilesControllerWeb.timKiem)

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
