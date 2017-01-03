var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); // pass passport for configuration
var configDB = require('../config/database.js');
var Sequelize = require('sequelize');
// var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);
var DetailBill = sequelize.import('../models/detailBill');
var User = sequelize.import('../models/user')
var Cart = require('../models/cart');
var Bill = sequelize.import('../models/bill')
var Product   = sequelize.import('../models/product');
var TypeProduct = sequelize.import('../models/typeProduct')
DetailBill.belongsTo(Bill, {foreignKey: 'idBill'});
Bill.hasMany(DetailBill);
DetailBill.belongsTo(Product, {foreignKey: 'idProduct'});
Product.hasMany(DetailBill)
Product.belongsTo(TypeProduct, {foreignKey: 'typeProductId'});
TypeProduct.hasMany(Product);
exports.Admin = function(req,res){
  res.render('index0')
};
exports.AddProduct = function(req,res){
  TypeProduct.findAll({
    order: '"id" ASC',
    attributes: ['route','name','id']
  }).then(function(loaisp){
    res.render('themsanpham',{loai: loaisp})
  })
};
exports.addProduct = function(req,res,done){
  var type = req.body.type;
  var name = req.body.name;
  var price = req.body.price;
  var promo_price = req.body.promo_price;
  var dvt = req.body.dvt;
  var description = req.body.description;
  var image = req.file.originalname;
  var promo = req.body.promo;
  var newProduct = Product.build ({name:name,typeProductId:type,description:description,unit_price:price,promotion_price: promo_price,image:image,view: 0,promo: promo,unit:dvt});
  newProduct.save()
  .then(function() {
    res.redirect('/addProduct')
    done (null, newProduct)
  }).catch(function(err) {
    done(null, false)
  });
};
exports.deleteProduct = function(req, res, done) {
    var productId = req.body.product_id;
    Product.findOne({
      where : {id : productId}
    }).then(function(product){
    product.destroy()
})
};
exports.updateProduct = function(req,res){
  var productId = req.params.id;
  console.log('----------------------------------------------');
  Product.sequelize.Promise.all([
  Product.findOne({
    where : {id : productId},
    attributes: ['id','name','typeProductId','description','unit_price','promotion_price','promotion','image','unit'],
    include:[{model:TypeProduct}]
  }),TypeProduct.findAll({
    order: '"id" ASC',
    attributes: ['route','name','id']
  })
]).spread(function(product,type){
    res.render('update',{
      loai: type,
      sanpham: product
    })
  })
};
exports.pUpdateProduct = function(req,res,done){
  var productId = req.body.id;
  console.log('-----------------------');
  var type = req.body.type;
  var name = req.body.name;
  var price = req.body.price;
  var promo_price = req.body.promo_price;
  var dvt = req.body.dvt;
  var description = req.body.description;
  if (req.file && req.file.originalname) {
    var image = req.file.originalname;
  }else {
    var image = req.body.image;

  }
  var promo = req.body.promo;
  Product.findOne({
    where : {id : productId},
  }).then(function(product){
    product.updateAttributes({
      name:name,
      typeProductId:type,
      description:description,
      unit_price:price,
      promotion_price: promo_price,
      image:image,
      promo: promo,
      unit:dvt,

    }).then(function(){
      res.redirect('/listProduct')
    })
  })

};
exports.queryProduct = function(req, res) {
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
		currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
	}else {
	  currentPage = 1;
    offSet= (currentPage -1)*pageSize;
	}
Product.sequelize.Promise.all([
    Product.count(),
    Product.findAll({
      limit: pageSize,
      offset: offSet,
      order: '"id" DESC',
      include:[{model:TypeProduct}]
    }),
  ]).spread(function(pageCount,Product){
      res.render('danhsach',{
        sanphammoi:Product,
        pageCount:(Math.ceil(pageCount/pageSize)),
        currentPage:currentPage})
    })

};
exports.Bill = function(req, res) {
  var pageSize = 6;
    if (typeof req.params.trang !== 'undefined') {
  		currentPage =req.params.trang;
      offSet= (currentPage -1)*pageSize;
  	}else {
  	  currentPage = 1;
      offSet= (currentPage -1)*pageSize;
  	}
  Product.sequelize.Promise.all([
      Bill.count(),
      Bill.findAll({
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        attributes: ['id','email','name','phone','address','total']
      }),
    ]).spread(function(pageCount,bill){
        res.render('bill',{
          bill:bill,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })

  };
exports.detailBill = function(req,res){
  var idBill = req.params.id
  DetailBill.findAll({
    where : {idBill : 23},
    attributes: ['id','idProduct', 'quality','price','updatedAt'],
    include: [{model: Product}]
  }).then(function(detailBill){
    res.render('detailBill',{
      bill : detailBill
    })
  })
}
exports.logout = function(req, res,callback) {
  	req.logout();
  	res.redirect('/homepage');
  };
  exports.login = function (req,res,callback) {
    res.render('login0.ejs',
    { message: req.flash('loginMessage') });
  }
  exports.plogin = 	passport.authenticate('admin-login', {
  successRedirect : '/addProduct', // redirect to the secure profile section
  failureRedirect : '/loginadmin', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
  		});
exports.signin = function(req,res){
  res.render('signup0.ejs',
  { message: req.flash('loginMessage') });
}
exports.psignin = passport.authenticate('admin-signup', {

    successRedirect : '/addProduct', // redirect to the secure profile section
    failureRedirect : '/signupadmin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  });
