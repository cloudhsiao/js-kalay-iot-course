var restify = require('restify'),
    server = restify.createServer();

server.get('/', function(req, res, next) {
    res.send('Hello, world.');
    next();
});

server.get('/hello/:name', function(req, res, next) {
    res.send('Hello, ' + req.params.name);
    next();
});

server.listen(8080, function() {
    console.log('%s listen at %s', server.name, server.url);
});
