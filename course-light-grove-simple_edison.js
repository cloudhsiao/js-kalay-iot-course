var mraa = require("mraa"),
    light = new mraa.Aio(0),
    iv;

iv = setInterval(function() {
    var lightValue = light.read();
    console.log('current light value: ' + lightValue);
}, 1000);

process.on('SIGINT', function() {
  clearInterval(iv);
  process.exit();
});
