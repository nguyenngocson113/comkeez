var configDB = require('../config/database.js');
var Sequelize = require('sequelize');
// var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);
var DetailBill = sequelize.import('../models/detailBill');
var User = sequelize.import('../models/user')
var Comment = sequelize.import('../models/comment')
var Cart = require('../models/cart');
var Bill = sequelize.import('../models/bill')
var Product   = sequelize.import('../models/product');
var TypeProduct = sequelize.import('../models/typeProduct')
Product.belongsTo(TypeProduct, {foreignKey: 'typeProductId'});
TypeProduct.hasMany(Product);
Comment.belongsTo(User,{foreignKey:'userId'});
User.hasMany(Comment);
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
  Comment.findAll({
    where:{idPost:req.params.trang},
    attributes:['content'],
    include:[{model:User,attributes:['facebookname','facebookid']}]
  }),
    Product.findOne({
      where : {id : req.params.trang}
    }),

    TypeProduct.findAll({
      order: '"id" ASC',
      attributes: ['route','name','id']
    })
  ]).spread(function(comment,product,type){
      res.render('./pages/chitietsp',{
        comment: comment,
        sp:product,
        loai:type,
        user: req.user
    })
  })
}

exports.addCart = function(req, res, next) {
    var productId = req.body.product_id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findOne({where:{id:productId},attributes:['name','promotion_price','id','image']}).then(function(product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        var b = JSON.stringify(cart);
        res.status(200).send(cart)
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
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/checkout');
};
exports.emptyCart = function(req,res){
  req.session.destroy();
  res.redirect('/checkout')
};
exports.updateCart = function(req,res){
  console.log(req.session.cart);
  var productId = req.body.product_id;
  var product_quantity = req.body.product_quantity;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.updateCart(productId,product_quantity);
  req.session.cart = cart;
  res.redirect('/checkout')
};
exports.checkOut = function(req,res,done){
  var email = req.body.email;
  console.log(email);
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var totalPrice = cart.totalPrice;
  var newBill = Bill.build ({email:email,address:address,name:name,total:totalPrice,phone: phone});
  newBill.save()
  .then(function() {
    done (null, newBill)
    cart.generateArray().forEach(function(sp){
      var newDetailBill = DetailBill.build ({idBill:newBill.id,idProduct:sp.item.id,quality:sp.qty,price:sp.price});
      newDetailBill.save().then(function(){done(null,newDetailBill)}).catch(function(err){done(null,false)})

    })

    console.log(newBill.id)
  }).catch(function(err) {
    done(null, false)
  });
};

exports.comment = function(req,res,done){
  var idPost = req.body.idPost;
  var idUser = req.body.idUser;
  var binhluan = req.body.binhluan;
  console.log('--------------------');
  var newComment = Comment.build({idPost:idPost,userId:idUser,content:binhluan});
  newComment.save().then(function(){done(null,newComment)}).catch(function(err){done(null,false)})
};
exports.timKiem = function(req,res){
  var txtSearch = req.body.search;
  Product.sequelize.Promise.all([
  TypeProduct.findAll({
    order: '"id" ASC',
    attributes: ['route','name','id']
  }),
  Product.findAll({where: {name: {$like: '%'+txtSearch+'%'}}}),

]).spread(function(type,product){
  console.log(JSON.stringify(product));
  res.render('./pages/search',{
    loai : type,
    sanpham: product,
  })
})
};
