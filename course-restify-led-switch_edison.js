var restify = require('restify'),
    mraa = require('mraa'),
    led = new mraa.Gpio(13),
    server = restify.createServer();

led.dir(mraa.DIR_OUT);

server.get('/led/:switch', function(req, res, next) {
    if (req.params.switch == 'on') {
        led.write(1);
        res.send('LED on');
    } else if (req.params.switch == 'off') {
        led.write(0);
        res.send('LED off');
    } else {
        res.send('Unknow command');
    }
    next();
});

server.listen(8080, function() {
    console.log('%s listen at %s', server.name, server.url);
});
