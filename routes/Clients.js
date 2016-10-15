'use strict';
var clients = {

	getAll: function (req, res) {
		console.log('-------------------------------------------------- CLIENTS GET ALL -----------------------------------------------------');
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

			var query = 'Select * from clients where deleted = 0';

			if (typeof args !== 'undefined' && args !== null) {
				query += ' and concat(id,name,tradeName,cnpj,stateInscription) like ? limit ' + req.params.limit + '  offset ' + req.params.offset;
				con.query(query, '%' + req.params.args + '%', function (err, rows) {
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

					con.query('Select count(*) as total from clients where deleted = 0  and concat(id,name,tradeName,cnpj,stateInscription) like ?', '%' + req.params.args + '%', function (err, rows) {
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

					con.query('Select count(*) as total from clients where deleted = 0', function (err, rows) {
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

	get: function (req, res) {
		console.log('------------------------------- CLIENT GET --------------------------------------');
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients where id = ?', req.params.id, function (err, rows){
				console.log('-------------------------------------------------------- ROWS --------------------------------------------------');
				console.log('ROWS: ', rows);
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
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients where concat(id,name,tradeName,cnpj,stateInscription) like ? and deleted = 0', '%' + req.params.args + '%', function (err, rows){
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

			var client = {
				name: req.body.name,
				tradeName: req.body.tradeName,
				cnpj: req.body.cnpj,
				stateInscription: req.body.stateInscription
			}

			con.query('Insert into clients set ?', client, function (err, result) {
				if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}

				res.status(200);
				res.json(result.insertId);
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

			var client = {
				name: req.body.name,
				tradeName: req.body.tradeName,
				cnpj: req.body.cnpj,
				stateInscription: req.body.stateInscription
			}

			con.query('Update clients set ? where id = ?', [client, req.body.id], function (err, result) {
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

			con.query('Update clients set deleted = 1 where id = ?', req.params.id, function (err, result) {
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

	getAllContacts: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients_contacts where client_id = ? and deleted = 0', req.params.id, function (err, rows){
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

	getContact: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients_contacts where client_id = ? and id = ?', [req.params.id, req.params.contactId], function (err, rows){
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

	searchContacts: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients_contacts where client_id = ? and value like ?', [req.params.id, '%' + req.params.args + '%'], function (err, rows){
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

	createContact: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			var contact = {
				client_id: req.body.client_id,
				contactType: req.body.contactType,
				value: req.body.value
			}

			con.query('Insert into clients_contacts set ?', contact, function (err, result) {
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

	updateContact: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			var contact = {
				client_id: req.body.client_id,
				contactType: req.body.contactType,
				value: req.body.value
			}

			con.query('Update clients_contacts set ? where client_id = ? and id = ?', [contact, contact.client_id, req.body.id], function (err, result) {
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

	removeContact: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Update clients_contacts set deleted = 1 where client_id = ? and id = ?', [req.params.id, req.params.contactId], function (err, result) {
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

	getAllAddress: function (req, res) {
		console.log('Entrou aqui');
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients_address where client_id = ? and deleted = 0', req.params.id, function (err, rows){
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

	getAddress: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

			con.query('Select * from clients_address where client_id = ? and id = ?', [req.params.id, req.params.addressId], function (err, rows){
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

	searchAddress: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Select * from clients_address where client_id = ? and concat(address_street, address_number, address_complement, district, postal_code) like ?', [req.params.id, '%' + req.params.args + '%'], function (err, rows){
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

	createAddress: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			var address = {
				client_id: req.body.client_id,
				country_id: req.body.country.country_id,
				state_id: req.body.state.state_id,
				city_id: req.body.city.city_id,
				address_street: req.body.street,
				address_number: req.body.number,
				address_complement: req.body.complement,
				district: req.body.neighbourhood,
				postal_code: req.body.postalCode
			}

			con.query('Insert into clients_address set ?', address, function (err, result) {
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

	updateAddress: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			var address = {
				country_id: req.body.country.country_id,
				state_id: req.body.state.state_id,
				city_id: req.body.city.city_id,
				address_street: req.body.street,
				address_number: req.body.number,
				address_complement: req.body.complement,
				district: req.body.neighbourhood,
				postal_code: req.body.postalCode
			}

			con.query('Update clients_address set ? where client_id = ? and id = ?', [address, req.body.client_id, req.body.id], function (err, result) {
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

	removeAddress: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
	            res.json({
	                'status': 500,
	                'message': 'Connection error'
	            });
			}

			con.query('Update clients_address set deleted = 1 where client_id = ? and id = ?', [req.params.id, req.params.addressId], function (err, result) {
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

module.exports = clients;
