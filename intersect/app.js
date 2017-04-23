// app.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var apirouter = require('./routes/api');
var pagerouter = require('./routes/pages');
var session = require('express-session');
var bodyParser = require('body-parser');
var client = require('au5ton-logger');

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware :)
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('trust proxy', 1)
app.use(session({
    secret: 'pawz',
    resave: true,
    saveUninitialized: true
}));
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public', 'css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="css/style.css"/>
}));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', apirouter);
app.use('/', pagerouter);

app.listen(8080);
client.success('8080 is the magic port');
