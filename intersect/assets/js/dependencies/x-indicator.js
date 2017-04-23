x.indicator = {
	loader: '<div class=\"sk-circle\">\r\n  <div class=\"sk-circle1 sk-child\"><\/div>\r\n  <div class=\"sk-circle2 sk-child\"><\/div>\r\n  <div class=\"sk-circle3 sk-child\"><\/div>\r\n  <div class=\"sk-circle4 sk-child\"><\/div>\r\n  <div class=\"sk-circle5 sk-child\"><\/div>\r\n  <div class=\"sk-circle6 sk-child\"><\/div>\r\n  <div class=\"sk-circle7 sk-child\"><\/div>\r\n  <div class=\"sk-circle8 sk-child\"><\/div>\r\n  <div class=\"sk-circle9 sk-child\"><\/div>\r\n  <div class=\"sk-circle10 sk-child\"><\/div>\r\n  <div class=\"sk-circle11 sk-child\"><\/div>\r\n  <div class=\"sk-circle12 sk-child\"><\/div>\r\n<\/div>',
	on: function (elem) {
		if (elem === undefined) {
			elem = x.query.id('indicator');
		}
		//expects an empty element ready for loader text or a previously initializes loader
		if (elem.innerHTML === indicator.loader) {
			elem.style.display = 'inline-block';
		} else {
			elem.innerHTML = indicator.loader;
		}
	},
	off: function (elem) {
		if (elem === undefined) {
			elem = x.query.id('indicator');
		}

		//expects an empty element ready for loader text or a previously initializes loader
		if (elem.innerHTML === indicator.loader) {
			elem.style.display = 'none';
		} else {
			//already off?
		}
	}
};
