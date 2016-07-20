var dht = require('beaglebone-dht'),
    request = require('request'),
    format = require('string-format'),
    sensor = dht.sensor('DHT11'),
    pin = 'P8_11',
    iv,
    data;

var api_key = 'ZBS7S0PEKP3217KD';

format.extend(String.prototype);

iv = setInterval(function() {
    var data = dht.read(pin);
    if (data) {
        console.log(data);
        var url = 'https://api.thingspeak.com/update?api_key={0}&field1={1}&field2={2}'.format(api_key, data.celsius, data.humidity);
        request(url, function(err, resp, body) {
            if (err) {
                throw err;
            }
            console.log('resp: ' + JSON.stringify(resp) + ', body: ' + body);
        })
    }
}, 10000);

process.on('SIGINT', function() {
    clearInterval(iv);
});
