'use strict'
var products = {

	getAll: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

			var query = 'Select * from products where deleted = 0';

			if (typeof args !== 'undefined' && req.params.args !== null) {
				query += ' and concat(id,name,description) like ? limit ' + req.params.limit + '  offset ' + req.params.offset;
				con.query(query, '%' + args + '%', function (err, rows) {
					if (err) {
						res.status(500);
	          res.json({
	              'status': 500,
	              'message': 'Query error'
	          });
					}

					var response = {
						data: rows
					}

					con.query('Select count(*) as total from products where deleted = 0  and concat(id,name,description) like ?', '%' + req.params.args + '%', function (err, rows) {
						if (err) {
							res.status(500);
		          res.json({
		              'status': 500,
		              'message': 'Query error'
		          });
						}

						response.count = rows[0].total;

						res.json(response);
					});
				});
			} else {
				query += ' limit ' + req.params.limit + '  offset ' + req.params.offset;
				con.query(query, function (err, rows) {
					if (err) {
						res.status(500);
	          res.json({
	              'status': 500,
	              'message': 'Query error'
	          });
					}

					var response = {
						data: rows
					}

					con.query('Select count(*) as total from products where deleted = 0', function (err, rows) {
						if (err) {
							res.status(500);
		          res.json({
		              'status': 500,
		              'message': 'Query error'
								});
						}

						response.count = rows[0].total;

						res.json(response);
					});
				});
			}
		});
	},

	get: function(req, res) {
		global.pool.getConnection(function (err, con){
			if (err) {
				res.status(500);
				res.json({
					'status': 500,
					'message': 'Connection error'
				});
			}

			con.query('Select * from products where id = ? and deleted = 0', req.params.id, function(err, rows){
				if (err) {
					res.status(500),
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
					'message': 'Connection error'
				});
			}

			con.query('Select * from products where concat(id,name,description) like ? and deleted = 0', '%' + req.params.args + '%', function (err, rows){
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
				});

				}

				res.json(rows);
			});
		})
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

			var products = {
				name: req.body.name,
				description: req.body.description,
				created_at: Date.now()
			}

			con.query('Insert into products set ?', products, function (err, result){
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

	update: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
				res.json({
					'statu': 500,
					'message': 'Connection error'
				});
			}

			var products = {
				name: req.body.name,
				description: req.body.description,
				manufacturer_id: req.body.manufacturer.manufacturer_id
			}

			con.query('Update products set ? where id = ?', [products, req.body.id], function (err, result) {
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
					'message': 'Connection error'
				});
			}

			con.query('Update products set deleted = 1 where id = ?', req.params.id, function (err, rows) {
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
	}
};

module.exports = products;
