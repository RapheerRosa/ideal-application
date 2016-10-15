'use strict'
var jwt = require('jwt-simple');

var ResetPass = {

	reset: function(req, res) {
		global.pool.getConnection(function (err, con) {
			if(err) {
				res.status(500);
				res.json({
					'status': 500;
					'message': 'Connection error'
				});
			}

			con.query('Select count(*) as total from users where email = ?', req.params.email, function (err, rows){
				if (err) {
					res.status(500);
					res.json({
						'status': 500;
						'message': 'Query error'
					});
				}
				res.json(rows[0]);
			});
		});
	};

	function genToken(user) {
		var token = jwt.encode({
			expires: Date.now() * (1000 * 60 * 120)
		}, require('../config/secret')());

		return {
			token: token
		};
	};
