var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); // pass passport for configuration

exports.signin = function(req,res,callback){
		res.render('./signin/signup.ejs',
		{ message: req.flash('loginMessage') });
};
exports.getProfile = function(req, res,callback) {
		res.render('./signin/profile.ejs', {
			user : req.user
		});
	};
exports.logout = function(req, res,callback) {
  	req.logout();
  	res.redirect('/homepage');
  };
exports.login = function(req, res,callback) {
  	res.render('./signin/login.ejs',
    { message: req.flash('loginMessage') });
  };
exports.plogin = 	passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		});
exports.psignin = passport.authenticate('local-signup',{
	successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
})
exports.loginFace = passport.authenticate('facebook',{
	scope : 'email'
})
exports.aLoginFace = passport.authenticate('facebook',{
	successRedirect : '/profile',
	failureRedirect : '/homepage'
})
exports.index = function(req,res){
	res.render('./signin/index')
}
