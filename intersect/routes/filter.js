module.exports = {
    auth: function (req, res, next) {

    	const publicly_accessible = [
    		'/login',
    		'/img/login.jpg',
            '/img/login.png',
            '/img/login.gif',
    		'/css/login.css',
            '/js/lib/fetch.js',
            '/img/loading.gif',
            '/api/login',
            '/favicon.ico',
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
