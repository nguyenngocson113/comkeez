var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/admin');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./public/assets/dest/images/products')
  },
  filename: function(req,file,cb){
    cb(false,file.originalname)
  }
})

var upload = multer({
  storage:storage
}).single('file')
// normal routes ===============================================================

	// show the home page (will also have our login links)
	router.get('/admin',FilesController.Admin)

	// PROFILE SECTION =========================
	// router.get('/themsanpham', isLoggedInAdmin,FilesController.Profile);
	router.get('/addProduct', isLoggedInAdmin,FilesController.AddProduct);
	router.get('/listProduct', isLoggedInAdmin,FilesController.queryProduct);
	router.get('/listProduct/:trang',isLoggedInAdmin,FilesController.queryProduct)

	// LOGOUT ==============================
	router.get('/logout',FilesController.logout)
	router.post('/addProduct',upload,FilesController.addProduct)
  router.post('/deleteProduct',isLoggedInAdmin,FilesController.deleteProduct)
  router.get('/updateProduct/:id',isLoggedInAdmin,FilesController.updateProduct)
  router.post('/updateProduct',upload,FilesController.pUpdateProduct)
  router.get('/bill',isLoggedInAdmin, FilesController.Bill)
  router.get('/bill/:trang',isLoggedInAdmin, FilesController.Bill)
  router.get('/detailBill/:id',isLoggedInAdmin, FilesController.detailBill)


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
	router.get('/loginadmin', FilesController.login);

		// process the login form
	router.post('/loginadmin',FilesController.plogin);

		// SIGNUP =================================
		// show the signup form
	router.get('/signupadmin', FilesController.signin)

		// process the signup form
	router.post('/signupadmin', FilesController.psignin)

	// // facebook -------------------------------
	//
	// 	// send to facebook to do the authentication
	// 	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	//
	// 	// handle the callback after facebook has authenticated the user
	// 	app.get('/auth/facebook/callback',
	// 		passport.authenticate('facebook', {
	// 			successRedirect : '/profile',
	// 			failureRedirect : '/'
	// 		}));


// route middleware to ensure user is logged in
function isLoggedInAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.$modelOptions.name.singular=='admin')
		return next();
	res.redirect('/homepage');
}
module.exports = router;
