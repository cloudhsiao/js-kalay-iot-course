var Gpio = require('onoff').Gpio,
    request = require('request'),
    format = require('string-format'),
    button = new Gpio(69, 'in', 'rising'),
    uid = '',
    msg = '';

format.extend(String.prototype);

button.watch(function(err, value) {
    if (err) {
        throw err;
    }
    if (value == 1) {
        var url = 'http://push.iotcplatform.com/tpns?cmd=event&uid={0}&event_type=100&msg={1}'.format(uid, msg);
        request(url, function(err, resp, body) {
            if (err) {
                throw err;
            }
            console.log(body);
        });
        console.log('Button pressed and push message to TPNS.');
    }
});

process.on('SIGINT', function() {
    button.unexport();
    process.exit();
});
