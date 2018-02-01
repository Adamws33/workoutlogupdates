// header- all origins have access to the app.js functions
module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*');
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
	res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
};

