var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var client = require('au5ton-logger');
var mysql = require('mysql');
var session = require('express-session');
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
var auth = function (req, res, next) {
	if (req.session && req.session.logged_in === true)
		return next();
	else
		return res.sendStatus(401);
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now())
	next()
})
// define the home page route
router.get('/', function (req, res) {
	req.session.logged_in = false;
	res.send('Birds home page');
})
// define the about route
router.get('/about', function (req, res) {
	if(req.session.logged_in === undefined) {
		res.redirect('/');
	}
	res.send('About birds');
});

router.get('/private', auth, function (req, res) {
	res.send('welcome to the underground, '+req.session.username+' !');
});

router.get('/echo', function(req, res) {
	res.send(JSON.stringify(req.session));
})

module.exports = router
