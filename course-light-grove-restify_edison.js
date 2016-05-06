var restify = require('restify'),
    server = restify.createServer(),
    mraa = require("mraa"),
    light = new mraa.Aio(0),
    iv,
    lightValue;


iv = setInterval(function() {
    lightValue = light.read();
    console.log('current light value: ' + lightValue);
}, 1000);


server.pre(restify.pre.sanitizePath());
server.get('/light/', function(req, res, next) {
  if (lightValue) {
    res.json({'sensor': 'light', 'value': lightValue});
  } else {
    res.send('No data');
  }
  next();
});

server.listen(8080, function() {
  console.log('%s listen at %s', server.name, server.url);
});
