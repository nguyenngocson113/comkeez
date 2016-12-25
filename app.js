var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var app = express();
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session'); // session middleware
var favicon = require('serve-favicon');
var SequelizeStore = require('connect-session-sequelize')(session);
// Connect to database
var pg = require('pg')



var configDB = require('./config/database.js');

var Sequelize = require('sequelize');
var db = new Sequelize(configDB.url);
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sessionStore = new SequelizeStore({
   db: db,
   checkExpirationInterval: 15 * 60 * 1000,
   expiration: 7 * 24 * 60 * 60 * 1000
});




require('./config/passport')(passport); // pass passport for configuration
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'zomaareenstukjetekstDatjenietzomaarbedenkt' ,
  resave:false,
  saveUninitialized:false,
  store: sessionStore

})); // session secret
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
sessionStore.sync()
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// Bootstrap models
// fs.readdirSync('./models').forEach(function(file) {
//   if (~file.indexOf('.js')) {
//     require('./models/' + file);
//   }
// });

// app.use('/*', expressJwt({
//     secret: require('./configurations/config').JWTSecret
// }).unless({
//     path: ['/login', '/users',/^\/files\/getFileByPath\/.*/]
// }));


// Apply routes
app.use('/', require('./routes/product'));
app.use('/', require('./routes/bill.js'));
app.use('/',require('./routes/users.js')); // load our routes and pass in our app and fully configured passport

// app.use('/', require('./routes/users')(router,passport));
// require('./routes/users')(app,passport)
// app.use('/friends', require('./routes/friends'));
// app.use('/socketio', require('./routes/socketio'));
// app.use('/files', require('./routes/files'));



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
