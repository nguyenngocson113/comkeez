var configDB = require('../config/database.js');
var Sequelize = require('sequelize');
// var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);
var Cart = require('../models/cart');
var Product   = sequelize.import('../models/product');
var TypeProduct = sequelize.import('../models/typeProduct')
Product.belongsTo(TypeProduct, {foreignKey: 'typeProductId'});
TypeProduct.hasMany(Product);

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
      order: '"createdAt" DESC'
    }),
    Product.findAll({
      limit: pageSize,
      offset: offSet,
      order: '"view" DESC'
    }),
    TypeProduct.findAll({
      order: '"id" ASC',
      attributes: ['route','name','id']
    })
  ]).spread(function(pageCount,newProduct,topProduct,type){
      res.render('./pages/index',{
        topProduct:topProduct,
        sanphammoi:newProduct,
        loai:type,
        pageCount:(Math.ceil(pageCount/pageSize)),
        currentPage:currentPage})
    })

};
exports.queryProductMan = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 1}}),
      Product.findAll({
        where:{typeProductId:1},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryProductNgot = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 2}}),
      Product.findAll({
        where:{typeProductId:2},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryProductFruit = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 3}}),
      Product.findAll({
        where:{typeProductId:3},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryProductKem = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 4}}),
      Product.findAll({
        where:{typeProductId:4},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryProductCrepe = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 5}}),
      Product.findAll({
        where:{typeProductId:5},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryProductPizza = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 6}}),
      Product.findAll({
        where:{typeProductId:6},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}

exports.queryProductSu = function(req,res){
  var pageSize = 6;
  if (typeof req.params.trang !== 'undefined') {
    currentPage =req.params.trang;
    offSet= (currentPage -1)*pageSize;
  }else {
    var currentPage = 1;
    var offSet= 0;
  }
  Product.sequelize.Promise.all([
  Product.count({where: {typeProductId: 7}}),
      Product.findAll({
        where:{typeProductId:7},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        include:[{model:TypeProduct}]
      }),
      TypeProduct.findAll({
        order: '"id" ASC',
        attributes: ['route','name','id']
      })
    ]).spread(function(pageCount,product,type){
        res.render('./pages/loaisp',{
          route: product[0].typeProduct.route,
          sanpham:product,
          tenloai:product[0].typeProduct.name,
          loai:type,
          pageCount:(Math.ceil(pageCount/pageSize)),
          currentPage:currentPage})
      })
}
exports.queryChitiet = function(req, res) {
Product.sequelize.Promise.all([
    Product.findOne({
      where : {id : req.params.trang}
    }),

    TypeProduct.findAll({
      order: '"id" ASC',
      attributes: ['route','name','id']
    })
  ]).spread(function(product,type){
    console.log('--------------------------');
      res.render('./pages/chitietsp',{
        sp:product,
        loai:type,
    })
  })
}
exports.addCart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findOne({where:{id:productId},attributes:['name','promotion_price','id','image']}).then(function(product) {
        cart.add(product, product.id);
        req.session.cart = cart;
      res.redirect('/homepage')
    });
};
exports.giohang = function(req,res){
  if(!req.session.cart){
    return res.render('./pages/cart-null',{product: null})
  }else {
    var cart = new Cart (req.session.cart)
    res.render('./pages/cart',{product: cart.generateArray(),totalPrice: cart.totalPrice})
  }
}
exports.removeItem = function(req, res, next) {
    var productId = req.body.product_id;
    console.log(productId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;

    cart.removeItem(productId);

    res.redirect('/checkout');
};
