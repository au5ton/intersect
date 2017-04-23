var magnet = require('magnet-uri');

x.query.id('addtorrent').addEventListener('click', function (event) {
	x.indicator.on();
    x.logger.setConsole(x.query.id('logger-window'));
    x.logger.print('Waiting user magnet link...');
	var uri = window.prompt('Enter your magnet link:');
    x.logger.println('done');
    x.logger.print('Decoding uri...')
	var parsed = magnet.decode(uri);
    x.logger.println('done');
    x.logger.println(JSON.stringify(parsed));
})

io.socket.on('connect', function () {
	io.socket.get('/torrent', function (torrents) {
		x.query.id('torrents').innerHTML = torrents;
	});
});

//io.socket.on('message')
