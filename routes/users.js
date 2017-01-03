var express = require('express');
var router = express.Router();
var FilesController = require('../controllers/users');

router.get('/signup',FilesController.signin)
router.get('/profile',isLoggedIn,FilesController.getProfile)
router.get('/logout',FilesController.logout)
router.get('/login',FilesController.login)
//=========================POST==============================
router.post('/login', FilesController.plogin)
router.post('/signup', FilesController.psignin);
router.get('/auth/facebook', FilesController.loginFace);
// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',FilesController.aLoginFace);
router.get('/signin',FilesController.index)
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/homepage');
}
module.exports= router;
// module.exports = function(router, passport) {
//
// // normal routes ===============================================================
//
// 	// show the home page (will also have our login links)
//
//
// 	// PROFILE SECTION =========================
// 	router.get('/profile', isLoggedIn, function(req, res) {
// 		console.log('1111111111111111111111111111111');
// 		console.log(req.user);
// 		res.render('profile.ejs', {
// 			user : req.user
// 		});
// 	});
//
// 	// LOGOUT ==============================
// 	router.get('/logout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});
//
// // =============================================================================
// // AUTHENTICATE (FIRST LOGIN) ==================================================
// // =============================================================================
//
// 	// locally --------------------------------
// 		// LOGIN ===============================
// 		// show the login form
// 		router.get('/login', function(req, res) {
// 			res.render('login.ejs', { message: req.flash('loginMessage') });
// 		});
//
// 		// process the login form
// 		router.post('/login', passport.authenticate('local-login', {
// 			successRedirect : '/profile', // redirect to the secure profile section
// 			failureRedirect : '/login', // redirect back to the signup page if there is an error
// 			failureFlash : true // allow flash messages
// 		}));
//
// 		// SIGNUP =================================
// 		// show the signup form
// 		router.get('/signup', function(req, res) {
//
// 			res.render('signup.ejs', { message: req.flash('loginMessage') });
// 		});
//
// 		// process the signup form
// 		router.post('/signup', passport.authenticate('local-signup', {
//
// 			successRedirect : '/profile', // redirect to the secure profile section
// 			failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 			failureFlash : true // allow flash messages
// 		}));
//
// 	// facebook -------------------------------
//
// 		// send to facebook to do the authentication
// 		router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//
// 		// handle the callback after facebook has authenticated the user
// 		router.get('/auth/facebook/callback',
// 			passport.authenticate('facebook', {
// 				successRedirect : '/profile',
// 				failureRedirect : '/'
// 			}));
// };
//
// // route middleware to ensure user is logged in
