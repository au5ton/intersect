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
	if (req.session && req.session.logged_in)
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
	res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
	res.send('About birds')
});

//If a POST request is sent to /api/login
router.post('/login', function (req, res) {

	if(req.body.username === undefined || req.body.password === undefined) {
		res.json({
			status: 'failed',
			reason: 'insufficientdata',
			description: 'You provided insuffient data to login'
		});
	}

	//Queue for a connection to the database
	pool.getConnection(function (err, connection) {
		if (err) throw err;

		//Query the database
		connection.query('SELECT * FROM `accounts`', function (error, results, fields) {
			if (error) throw error;
			//no errors, we're connected!
			connection.release();
			//We got our data, time to release the connection for another request

			//`results` -> array of users
			for (let i = 0; i < results.length; i++) {
				if (results[i]['username'].toLowerCase() === req.body.username.toLowerCase()) {
					if (results[i]['password'] === '') {
						//FW user hasn't logged in in a *looong* time,
						//they must go to the main FW site to rehash their password using PHP
						res.json({
							status: 'failed',
							reason: 'legacyonly',
							description: 'Your password must be rehashed by logging into the main site.'
						});
					}

					//bcrypt built into PHP includes a different prefix
					//solution derived from: http://stackoverflow.com/questions/23015043/verify-password-hash-in-nodejs-which-was-generated-in-php
					var db_hash = results[i]['password'];
					db_hash = db_hash.replace(/^\$2y(.+)$/i, '\$2a$1');
					bcrypt.compare(req.body.password, db_hash, function (err, good) {
						if (good) {
							//If good password
							req.session.username = results[i]['username'];
							req.session.logged_in = true;
							res.json({
								status: 'success',
								reason: 'goodpassword',
								description: 'Login succesful'
							});
						} else {
							//If bad password
							res.json({
								status: 'failed',
								reason: 'badpassword',
								description: 'Your password doesn\'t match the database'
							})
						}
					});
				}
			}

		});
	});
});

router.get('/private', auth, function (req, res) {
	res.send('welcome to the underground');
})

module.exports = router
