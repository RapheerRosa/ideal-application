'use strict'
var jwt         = require('jwt-simple'),
var nodemailer  = require('nodemailer');

// Cria um objeto reusavel usando o meio de envio de transporte SMTP
var transporter = nodemailer.createTransport(option.pool, option.maxMessages, option.maxConnections);

// Configuração do smtp
var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true; // use ssl
    auth: {
        user: 'user@gmail.com', // definir com pimps
        pass: 'pass' // definir com o pimps
    }
};

// Evento para checar conexão do smtp
transporter.verify(function(err, sucess){
    if (err) {
      console.log('Error');
      res.status(500);
      res.json({
          'status': 500,
          'message': 'Connection error'
      });
    } else {
      console.log('sucess');
      res.status(200);
      res.json({
          'status': 200,
          'message': 'Server is ready to take our message'
      });
    }
  });

// template baseado em reset de senha
var sendPwdReset = transporter.templateSender({
    subject: 'Password reset for {{username}}!',
    text: 'Hello, {{username}}, you forget the password?',
    html: '<b>Please <a href="{{ aqui a gente tera que referenciar qual pagina? a do reset ne? }}">go here to reset your password</a></p>'
}, {
    from: 'sender@example.com',
});


// Envio de email com objeto de transporte definido
transporter.sendMail(sendPwdReset, function (err, info){
  if (err) {
    console.log('error');
    res.status(500);
    res.json({
        'status': 500,
        'message': 'Password dont reseted'
    });
  } else {
    console.log('sucess');
    res.status(200);
    res.json({
        'status': 200,
        'message': 'Password reset send'
    });
  }
)};
