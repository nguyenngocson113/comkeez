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

exports.queryNewProduct = function(req, res,done) {
  var pageSize = 10;
	var	currentPage =req.params.trang;
  var  offSet= (currentPage -1)*pageSize;

    Product.findAll({
      limit: pageSize,
      offset: offSet,
      attributes: ['name','unit_price','id','image','createdAt'],
      order: '"createdAt" DESC'
    }).then(function(sp){
      done()
      res.send(sp)
    })
};
exports.queryTopProduct = function(req, res,done) {
  var pageSize = 10;
	var	currentPage =req.params.trang;
  var  offSet= (currentPage -1)*pageSize;

    Product.findAll({
      limit: pageSize,
      offset: offSet,
      attributes: ['name','unit_price','id','image','createdAt','view'],
      order: '"view" DESC'
    }).then(function(sp){
      done()
      console.log(sp);
      res.send(sp)
    })
};
exports.queryChitiet = function(req, res,done) {
    Product.findOne({
      where : {id : req.params.trang},
      attributes: ['name','promotion_price','id','image','description'],
    }).then(function(product){
      done()
      res.send(product)
    })
}
exports.queryComment = function(req, res,done) {
  var comment = []
  Comment.findAll({
  where:{idPost:req.params.id},
  include:[{model:User}],
  raw: true,
}).then(function(cmt){
  done()
  res.send(cmt)
  })
}
exports.queryProductType = function(req,res,done){
  var typeId = req.params.typeId;
  var pageSize = 10;
  var currentPage =req.params.trang;
  var  offSet= (currentPage -1)*pageSize;
      Product.findAll({
        where:{typeProductId:typeId},
        limit: pageSize,
        offset: offSet,
        order: '"id" DESC',
        attributes: ['name','promotion_price','id','image','unit_price'],
      }).then(function(sp){
        done();
        res.send(sp)
      })
};
exports.queryType = function(req,res,done){
  TypeProduct.findAll({
    order: '"id" ASC',
    attributes: ['name','id','image']
  }).then(function(type){
    res.send(type)
  })
};
exports.getProductBySearch = function(req,res,done){
  var txtSp = req.body.txtSp;
  Product.findAll({
    where: {name: {$like: '%'+txtSp+'%'}}
  }).then(function(sp){
    res.send(sp)
  })
}
exports.productBuy = function(req,res,done){
  var email = req.body.email;
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var totalPrice = req.body.total;
  var product = req.body.products;
  var newBill = Bill.build ({email:email,address:address,name:name,total:totalPrice});
  newBill.save()
  .then(function() {
    done (null, newBill)
    product.forEach(function(sp){
      var newDetailBill = DetailBill.build ({idBill:newBill.id,idProduct:sp.idProduct,quality:sp.quality,price:sp.price});
      newDetailBill.save().then(function(){done(null,newDetailBill)}).catch(function(err){done(null,false)})

    })

    console.log(newBill.id)
  }).catch(function(err) {
    done(null, false)
  });
};
exports.getProducts = function(req, res,done) {
    Product.findAll({
      attributes: ['name']
    }).then(function(sp){
      done()
      res.send(sp)
    })
};
