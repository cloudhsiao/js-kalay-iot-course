var dht = require('beaglebone-dht'),
    request = require('request'),
    format = require('string-format'),
    sensor = dht.sensor('DHT11'),
    pin = 'P9_11',
    iv,
    uid = '',
    msg = '',
    threshold = 25;

format.extend(String.prototype);

var url = 'http://push.iotcplatform.com/tpns?cmd=event&uid={0}&event_type=100&msg={1}'.format(uid, msg);

iv = setInterval(function() {
    var data = dht.read(pin);
    if (data) console.log(data);
    if (data && data.celsius > threshold) {
        request(url, function(err, resp, body) {
            if (err) {
                throw err;
            }
            console.log(body);
        });
        console.log('Temperature over threshold and push message to TPNS.');
    }
}, 1000);

process.on('SIGINT', function() {
    clearInterval(iv);
});
