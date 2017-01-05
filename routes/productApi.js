var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/product');
var configDB = require('../config/database.js');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(configDB.url);

var Cart = require('../models/cart');
var Product   = sequelize.import('../models/product');


/*GET*/
// router.get('/trangchu',FilesControllerWeb.queryNewProduct)
router.get('/getNewProduct/:trang', FilesController.queryNewProduct);//lay sp moi, phan trang 1 trang 10 sp
router.get('/getProductViewMost/:trang', FilesController.queryTopProduct);
router.get('/getProduct/:trang', FilesController.queryChitiet);//chi tiet sp
router.get('/getComment/:id', FilesController.queryComment);//chi tiet sp
router.get('/getProductType/:typeId/:trang', FilesController.queryProductType);//danh sach tung loai banh phan trang 1 trang 10 sp
router.get('/getTypes', FilesController.queryType);// lay ra loai sp
router.get('/getProducts', FilesController.getProducts);
router.post('/dangnhap', FilesController.dangnhap);
router.post('/binhluan', FilesController.binhluan);
router.get('/getbinhluan/:trang', FilesController.getbinhluan);
router.get('/hoadon/:trang', FilesController.Bill);
router.post('/address', FilesController.address);


    // router.get('/getNewProduct/:trang', FilesController.getNewProduct);
// router.get('/getNewProduct/:trang', FilesControllerWeb.getNewProduct);
// router.get('/getProductViewMost/:trang', FilesController.getProductViewMost);
// router.get('/getProducts', FilesController.getProducts);
// router.get('/getProduct/:productId', FilesController.getProduct);
// router.get('/getProductType/:typeId/:trang', FilesController.getProductType);
// router.post('/getProductBySearch', FilesController.getProductBySearch);

//
// /*POST*/
router.post('/getProductBySearch', FilesController.getProductBySearch);// search
router.post('/productBuy', FilesController.productBuy);

module.exports = router;
