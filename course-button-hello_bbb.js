var Gpio = require('onoff').Gpio,
    button = new Gpio(68, 'in', 'rising');

button.watch(function(err, value) {
    if (err) {
        throw err;
    }
    if (value == 1) {
        console.log('Hello, world.');
    }
});

process.on('SIGINT', function() {
    button.unexport();
    process.exit();
});
