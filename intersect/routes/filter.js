module.exports = {
    auth: function (req, res, next) {

    	const publicly_accessible = [
    		'/login',
    		'/img/login.jpg',
            '/img/login.png',
    		'/css/login.css',
            '/js/lib/fetch.js',
            '/echo'
    	];

    	if (req.session && req.session.logged_in === true)
    		return next();
    	else if(publicly_accessible.indexOf(req.url) >= 0) {
    		return next();
    	}
        else if(req.url === '/') {
            return res.redirect('/login');
    	}
    	else {
    		return res.sendStatus(401);
    		//return next();
        }
    }
};
