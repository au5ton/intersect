// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware :)

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="css/style.css"/>
}));
app.use('/public', express.static(path.join(__dirname, 'public')));

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
