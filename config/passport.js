// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var configDB = require('./database.js');
var Sequelize = require('sequelize');
// var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);

var User   = sequelize.import('../models/user');
var Admin  = sequelize.import('../models/admin');

User.sync();

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = (passport) => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      var userType = user.$modelOptions.name.singular;
      //   done(null, user.id);
      var key = {
      id: user.id,
      type: userType
    }
  done(null, key);
    });
    // used to deserialize the user
    passport.deserializeUser(
      function(key, done) {
        if(key.type=='user'){
        User.findById(key.id).then(function(user){
			done(null, user);
		}).catch(function(e){
			done(e, false);
		});
    }else {
      Admin.findById(key.id).then(function(user){
    done(null, user);
  }).catch(function(e){
    done(e, false);
  });
    }
    }
  );
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
      if(req.body.nguoidung=='user'){
			User.findOne({ where: { localemail: email }})
				.then(function(user) {
					if (!user) {
						done(null, false, req.flash('loginMessage', 'Unknown user'));
					} else if (!user.validPassword(password)) {
						done(null, false, req.flash('loginMessage', 'Wrong password'));
					} else {
						done(null, user);
					}
				})
				.catch(function(e) {
					done(null, false, req.flash('loginMessage',e.name + " " + e.message));
				});
      }
	}));
  passport.use('admin-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, email, password, done) {
    if(req.body.nguoidung=='admin'){

    Admin.findOne({ where: { localemail: email }})
      .then(function(user) {
        if (!user) {
          done(null, false, req.flash('loginMessage', 'Unknown user'));
        } else if (!user.validPassword(password)) {
          done(null, false, req.flash('loginMessage', 'Wrong password'));
        } else {
          done(null, user);
        }
      })
      .catch(function(e) {
        done(null, false, req.flash('loginMessage',e.name + " " + e.message));
      });
    }
	}));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        // emailField: 'name',
        passwordField : 'password',
        usernameField : 'email',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req,email,password,done) {
		//  Whether we're signing up or connecting an account, we'll need
		//  to know if the email address is in use.
    if(req.body.nguoidung=='user'){
		User.findOne({ where: { localemail: email }})
			.then(function(existingUser) {
				// check to see if there's already a user with that email
				if (existingUser)
					return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
				//  If we're logged in, we're connecting a new local account.
				else {
					// create the user
					var newUser = User.build ({localemail: email, localpassword: User.generateHash(password)});
					newUser.save().then(function() {done (null, newUser);}).catch(function(err) { done(null, false, req.flash('loginMessage', err));});
				}
			})
			.catch(function (e) {
				done(null, false, req.flash('loginMessage',e.name + " " + e.message));
			})
    }
    }));
    passport.use('admin-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        // emailField: 'name',
        passwordField : 'password',
        usernameField : 'email',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req,email,password,done) {
    if(req.body.nguoidung=='admin') {
      Admin.findOne({ where: { localemail: email }})
        .then(function(existingUser) {
          // check to see if there's already a user with that email
          if (existingUser)
            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
          //  If we're logged in, we're connecting a new local account.
          else {
            // create the user
            var newUser = Admin.build ({localemail: email, localpassword: Admin.generateHash(password)});
            newUser.save().then(function() {done (null, newUser);}).catch(function(err) { done(null, false, req.flash('loginMessage', err));});
          }
        })
        .catch(function (e) {
          done(null, false, req.flash('loginMessage',e.name + " " + e.message));
        })
    }
  }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
		//enableProof: true,
        passReqToCallback : true ,// allows us to pass in the req from our route (lets us check if a user is logged in or not)
				profileFields: ['emails','name']
    },
    function(req, token, refreshToken, profile, done) {
            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ where :{ 'facebookid' : profile.id }})
					.then (function (user) {
						if (user) {

							// if there is a user id already but no token (user was linked at one point and then removed)
							if (!user.facebooktoken) {
								user.facebooktoken = token,
								user.facebookname  = profile.name.givenName + ' ' + profile.name.familyName,
								user.facebookemail = (profile.emails[0].value || ' ').toLowerCase()

								user.save()
									.then( function() {done(null, user);})
									.catch (function(e) {});
                            } else {
								done(null, user);
							}
						} else {
							// if there is no user, create them
							var newUser = User.build ({
								facebookid: profile.id,
								facebooktoken: token,
								facebookname: profile.name.givenName + ' ' + profile.name.familyName,
								facebookemail:(profile.emails[0].value || '').toLowerCase()
							});

							newUser.save()
										.then( function() {done(null, user);})
										.catch (function(e) {});
						}

					});
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.facebookid    = profile.id;
                user.facebooktoken = token;
								user.facebookname  = profile.name.givenName + ' ' + profile.name.middleName +' '+ profile.name.familyName;
								user.facebookemail = (profile.emails[0].value || '').toLowerCase();
								console.log(profile.name.givenName+ profile.name.familyName);

                user.save()
																				.then( function() {done(null, user);})
																				.catch (function(e) {});
            }
    }));




};
