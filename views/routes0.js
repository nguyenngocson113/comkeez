module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/admin', function(req, res) {
		res.render('index0.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profileadmin', isLoggedInAdmin, function(req, res) {
		console.log('2222222222222222222222222222222222222222222');
		console.log(req.user);
		res.render('forms.ejs', {
			// user : req.user
		});
	});
	app.get('/update', isLoggedInAdmin, function(req, res) {
		console.log('2222222222222222222222222222222222222222222');
		console.log(req.user);
		res.render('tables.ejs', {
			// user : req.user
		});
	});
	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/loginadmin', function(req, res) {
			res.render('login0.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/loginadmin', passport.authenticate('admin-login', {
			successRedirect : '/profileadmin', // redirect to the secure profile section
			failureRedirect : '/loginadmin', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signupadmin', function(req, res) {
			res.render('signup0.ejs', { message: req.flash('loginMessage') });
		});

		// process the signup form
		app.post('/signupadmin', passport.authenticate('local-signup', {

			successRedirect : '/profileadmin', // redirect to the secure profile section
			failureRedirect : '/signupadmin', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

};

// route middleware to ensure user is logged in
function isLoggedInAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.$modelOptions.name.singular=='admin')
		return next();
	res.redirect('/');
}
