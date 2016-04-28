var restify = require('restify'),
    dht = require('beaglebone-dht'),
    sensor = dht.sensor('DHT11'),
    server = restify.createServer(),
    pin = 'P9_11',
    iv,
    data;

iv = setInterval(function () {
    var read = dht.read(pin);
    if (read) {
        data = read;
        console.log(data);
    }
}, 1000);

server.pre(restify.pre.sanitizePath());
server.get('/dht11/', function(req, res, next) {
    if (data) {
        res.json(data);
    } else {
        res.send('No data');
    }
    next();
});

server.listen(8080, function() {
    console.log('%s listen at %s', server.name, server.url);
});
