var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var client = require('au5ton-logger');
var mysql = require('mysql');
var session = require('express-session');
var filter = require('./filter');
var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'fluff.world',
	user: process.env.FWDB_USER,
	password: process.env.FWDB_PASS,
	database: 'fw3_test'
});
pool.getConnection(function (err, connection) {
	if (err) throw err;

	client.success('db connection successful, releasing thread  ', connection.threadId);
	connection.release();
});

// Authentication and Authorization Middleware



// define the home page route
router.get('/', function (req, res) {
	res.send('Birds home page, \nlogged in:'+req.session.logged_in);
});

// define the home page route
router.get('/login', function (req, res) {
	req.session.logged_in = false;
	res.render('pages/login');
});

// define the about route
router.get('/about', function (req, res) {
	res.send('About birds, \nlogged in:'+req.session.logged_in);
});

router.get('/private', function (req, res) {
	res.send('welcome to the underground, '+req.session.username+' !');
});

router.get('/echo', function(req, res) {
	res.send(JSON.stringify(req.session));
})

module.exports = router
