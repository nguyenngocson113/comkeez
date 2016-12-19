var configDB = require('../config/database.js');
var Sequelize = require('sequelize');
// var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);

var Product   = sequelize.import('../models/product');
exports.queryNewProduct = function(req, res) {
  var sosp1trang = 6;
  var trangdangxem = req.params.trang;
  var product = [];
  var topProduct = [];
// Product.sequelize.Promise.all([
    Product.findAll({
      limit: sosp1trang,
      offset: trangdangxem,
      order: '"id" DESC'
    })
    // Product.findAll({
    //   limit: sosp1trang,
    //   offset: trangdangxem,
    //   order: '"view" DESC'
    // })
.then(function(newProduct){
      res.send(newProduct)
      // res.render('./pages/index',{topProduct:topProduct,sanphammoi:newProduct})
    })
};
