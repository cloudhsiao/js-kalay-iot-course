var mraa = require('mraa'),
    led = new mraa.Gpio(13),
    iv;

led.dir(mraa.DIR_OUT);

iv = setInterval(function () {
    led.write(led.read() ^ 1);
}, 200);

process.on('SIGINT', function() {
    clearInterval(iv);
    led.write(0);
    process.exit();
});
