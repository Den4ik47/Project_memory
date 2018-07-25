const express = require('express');
const bodyParser = require('body-parser');
// connect to the database and load models
var passport = require('passport');
var session=require('express-session');
var morgan = require('morgan');
const app = express();
var cookieParser=require('cookie-parser');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
secret:"Nasza_appka",
resave: false,
saveUninitialized: true,
cookie: { secure: true }
}
));
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
// app.use(passport.initialize());
// const localSignupStrategy = require('./server/config/local-signup');
// const localLoginStrategy = require('./server/config/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);
// pass the authorization checker middleware
const authRoutes = require('./server/routes/auth');
const project_route = require('./server/routes/project');
app.use('/auth', authRoutes);
app.use('/project', project_route);
// routes


// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
