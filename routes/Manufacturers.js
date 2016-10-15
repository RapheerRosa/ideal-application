'use strict'
var manufacturers = {

	getAll: function (req, res) {
		global.pool.getConnection(function (err,con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Connection error'
				});
			}

			con.query('Select * from manufacturers where deleted = 0', function (err, rows){
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				res.json(rows);
			});
		});
	},

	get: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Connection error'
				});
			}

			con.query('Select * from manufacturers where id = ?', req.params.id, function (err, rows){
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				res.json(rows[0]);
			});
		});
	},

	search: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Query error'
				});
			}

			con.query('Select * from manufacturers where concat(id,name,tradeName,cnpj,stateInscription) like ? and deleted = 0', '%' + req.params.args + '%', function (err, rows) {
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				res.json(rows);
			});
		});
	},

	create: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Connection error'
				});
			}

			var manufacturers = {
				name: req.body.name,
				tradeName: req.body.tradeName,
				cnpj: req.body.cnpj,
				stateInscription: req.body.stateInscription
			}

			con.query('Insert into manufacturers set ?', manufacturers, function (err, result) {
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				manufacturers.id = result.insertId;

				res.status(200);
				res.json(manufacturers);
			});
		});
	},

	update: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Connection error'
				});
			}

			var manufacturers = {
				id: req.body.id,
				name: req.body.name,
				tradeName: req.body.tradeName,
				cnpj: req.body.cnpj,
				stateInscription: req.body.stateInscription,
				created_at: Date.now()
			}

			con.query('Update manufacturers set ? where id = ?', [manufacturers, req.body.id], function (err, result) {
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				res.status(200);
				res.json({
					'status': 200,
					'message': 'OK'
				});
			});
		});
	},

	remove: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Query error'
				});
			}

			res.status(200);
			res.json({
				'status': 200,
				'message': 'OK'
			});
		});
	}
};

module.exports = manufacturers;
