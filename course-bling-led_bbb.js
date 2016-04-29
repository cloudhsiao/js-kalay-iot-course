var Gpio = require('onoff').Gpio,
    led = new Gpio(68, 'out'),
    iv;

iv = setInterval(function () {
    led.writeSync(led.readSync() ^ 1);
}, 200);

process.on('SIGINT', function() {
    clearInterval(iv);
    led.writeSync(0);
    led.unexport();
    process.exit();
});
