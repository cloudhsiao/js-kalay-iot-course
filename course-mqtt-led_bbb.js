var Gpio = require('onoff').Gpio,
    led = new Gpio(68, 'out');

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://iot.eclipse.org');

var topic = 'course/student/cloudhs/led';

client.on('connect', function() {
    console.log('mqtt connected');
    client.subscribe(topic);
});

client.on('message', function(topic, message) {
    var payload = message.toString();
    if (payload == 'led_on') {
        led.writeSync(1);
    } else if (payload == 'led_off') {
        led.writeSync(0);
    } else {
        console.log('unknown command');
    }
});
    
