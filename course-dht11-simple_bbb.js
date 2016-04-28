var dht = require('beaglebone-dht'),
    sensor = dht.sensor('DHT11'),
    pin = 'P9_11',
    iv;

iv = setInterval(function () {
    var data = dht.read(pin);
    if (data) {
        console.log(data);
    }
}, 1000);

setTimeout(function () {
    clearInterval(iv);
}, 15 * 1000);
