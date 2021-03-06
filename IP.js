var express = require('express');
var app = express();

var nodemailer = require('nodemailer');

app.get('/', function(req, res) {
	res.send('');
	
	var ip = req.headers["x-forwarded-for"];
	if (ip){
		var list = ip.split(",");
		ip = list[list.length-1];
	} else {
		ip = req.connection.remoteAddress;
	}
	
	console.log(ip);
	
	//var ip = req.ip.replace('::ffff:', '')
	
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'sitointernetperrintracciareip@gmail.com',
		pass: 'gallettostube'
	  }
	});

	var mailOptions = {
	  from: 'sitointernetperrintracciareip@gmail.com',
	  to: 'bertoldimichele83@gmail.com',
	  subject: 'Accesso effettuato',
	  text: 'Una persona ha fatto accesso al sito.\n\n\tData:     ' + new Date(Date.now()).toString() + '\n\tIndirizzo Ip:     ' + ip
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
});

app.listen(process.env.PORT || 8080);
