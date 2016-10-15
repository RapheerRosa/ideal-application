'use strict';

var utils = {
  searchCountries: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM country WHERE deleted = 0';

      con.query(query, function (err, rows) {
          if (err) {
  					res.status(500);
  					res.json({
  						'status': 500,
  						'message': 'Query error'
  					});
  				}
      		res.status(200);
  				res.json(rows);
			});
    });
  },
  searchStates: function (req, res) {
		global.pool.getConnection(function (err, con) {

			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM state WHERE deleted = 0 and country_id = ?';
      con.query(query, req.params.countryId, function (err, rows) {
        if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}
    		res.status(200);
				res.json(rows);
			});
    });
  },
  searchCities: function (req, res) {
		global.pool.getConnection(function (err, con) {

			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM city WHERE deleted = 0 and state_id = ?';
      con.query(query, req.params.stateId, function (err, rows) {
        if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}
    		res.status(200);
				res.json(rows);
			});
    });
  },
  getCountry: function (req, res) {
		global.pool.getConnection(function (err, con) {
			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM country WHERE deleted = 0 and country_id = ?';

      con.query(query, req.params.countryId, function (err, rows) {
          if (err) {
  					res.status(500);
  					res.json({
  						'status': 500,
  						'message': 'Query error'
  					});
  				}
      		res.status(200);
  				res.json(rows);
			});
    });
  },
  getState: function (req, res) {
		global.pool.getConnection(function (err, con) {

			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM state WHERE deleted = 0 and state_id = ?';
      con.query(query, req.params.stateId, function (err, rows) {
        if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}
    		res.status(200);
				res.json(rows);
			});
    });
  },
  getCity: function (req, res) {
		global.pool.getConnection(function (err, con) {

			if (err) {
				res.status(500);
        res.json({
            'status': 500,
            'message': 'Connection error'
        });
			}

      var query = 'SELECT * FROM city WHERE deleted = 0 and city_id = ?';
      con.query(query, req.params.cityId, function (err, rows) {
        if (err) {
					res.status(500);
					res.json({
						'status': 500,
						'message': 'Query error'
					});
				}
    		res.status(200);
				res.json(rows);
			});
    });
  }
}

module.exports = utils;
