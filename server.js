'use strict';
var cluster = require('cluster');

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker) {
    console.log('worker exited');
    cluster.fork();
  });

  cluster.on('disconnect', function(worker)
  {
    console.log('worker disconnected');
    cluster.fork();
  });

} else {
  var domain = require('domain'),
      express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      mysql = require('mysql'),
      bcrypt = require('bcrypt'),
      logger = require('morgan'),
      bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({
      extended: true
  }));

  app.use(bodyParser.json());

  app.use(logger('dev'));

  app.use(function (req, res, next) {
    var requestDomain = domain.create();

    requestDomain.on('error', function(err) {
        console.error('error', er.stack);
        try
        {
           var killtimer = setTimeout(function()
           {
             process.exit(1);
           }, 30000);

           killtimer.unref();
           server.close();

           cluster.worker.disconnect();

           res.status(500);
           res.set('content-type', 'text/plain');
           res.end('Oops, there was a problem!\n');
       }
       catch (er2)
       {
          console.error('Error sending 500!', er2.stack);
       }
    });

    requestDomain.enter();
    next();
  });

  app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      if (req.method == 'OPTIONS') {
          res.status(200).end();
      } else {
          next();
      }
  });

  app.all('/rest/*', [require('./middlewares/validateRequest')])

  app.use('/', require('./routes/Routes'));

  var port = process.env.PORT || 3000;

  mongoose.connect('mongodb://localhost:27017/ideal');

  global.pool = mysql.createPool({
      connectionLimit: 100,
      host: 'localhost',
      user: 'guest',
      password: 'Fg&CW2H?6TwCWMeV',
      database: 'ideal',
      debug: true
  });

  global.saltRounds = 10;

  var server = app.listen(port);
  console.log('Server started on port: ' + port);
}
