var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://iot.eclipse.org');

var topic = 'itri/member/cloudhs/demo';

client.on('connect', function() {
    console.log('mqtt connected');
    client.subscribe(topic);
});

client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString());
});
