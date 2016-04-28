var Gpio = require('onoff').Gpio,
    led = new Gpio(68, 'out'),
    iv;

function exit() {
    led.unexport();
    process.exit();
}

iv = setInterval(function () {
    led.writeSync(led.readSync() ^ 1);
}, 200);

setTimeout(function () {
    clearInterval(iv);
    led.writeSync(0);
    led.unexport();
}, 10 * 1000);
