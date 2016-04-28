var restify = require('restify'),
    Gpio = require('onoff').Gpio,
    led = new Gpio(68, 'out'),
    server = restify.createServer();

server.get('/led/:switch', function(req, res, next) {
    if (req.params.switch == 'on') {
        led.writeSync(1);
        res.send('LED on');
    } else if (req.params.switch == 'off') {
        led.writeSync(0);
        res.send('LED off');
    } else {
        res.send('Unknow command');
    }
    next();
});

server.listen(8080, function() {
    console.log('%s listen at %s', server.name, server.url);
});
