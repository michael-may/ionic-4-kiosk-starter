let express = require('express');
let compression = require('compression');

let init = function() {
    let app = express();
    
    app.use(compression());

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		next();
    });
    
    // Handle static files
    app.use(
        (req, res, next) => {
            next();
        },
        express.static(__dirname + '/www', { fallthrough: true })
    ); 
    
    // Everything else to index
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/www/index.html');
    });

	console.log('Starting server...');
	let server = app.listen(process.env.PORT || 8080, function() {
		let port = server.address().port;
		console.log('Server listening on ' + port);
	});
};

init();
