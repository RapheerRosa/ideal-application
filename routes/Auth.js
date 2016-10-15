'use strict';
var jwt = require('jwt-simple'),
    bcrypt = require('bcrypt');

var Auth = {

    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                'status': 401,
                'message': 'Invalid credentials'
            });
            return;
        }

        global.pool.getConnection(function(err, con) {
            if (err) {
                res.status(500);
                res.json({
                    'status': 500,
                    'message': 'Connection error'
                });
            }

            con.query('Select id, name, username, email, password from users where username = ?', username, function(err, rows) {
                if (err) {
                    res.status(500);
                    res.json({
                        'status': 500,
                        'message': 'Query error'
                    });
                }

                if (rows.length > 0) {
                    bcrypt.compare(password, rows[0].password, function(err, isEqual) {
                        if (err) {
                        	console.log('compare');
                            res.status(500);
                            res.json({
                                'status': 500,
                                'message': 'Encryption error'
                            });
                        }

                        if (isEqual) {
                            res.json(genToken({
                                "id": rows[0].id,
                                "name": rows[0].name,
                                "username": rows[0].username,
                                "email": rows[0].email
                            }));
                        } else {
                            res.status(401);
                            res.json({
                                'status': 401,
                                'message': 'Invalid Credentials'
                            });
                        }
                    });
                } else {
                    res.status(401);
                    res.json({
                        'status': 401,
                        'message': 'Invalid Credentials'
                    });
                }
            });
        });
    },

    validateUser: function(username, callback) {
        global.pool.getConnection(function(err, con) {
            if (err) {
                callback(false);
            }
            con.query('Select id, name, email from users where username = ?', username, function(err, rows) {
                if (err) {
                  callback(false);
                }
                callback(rows);
            });
        });
    }
}

function genToken(user) {
    var expires = expiresIn(7);
    var token = jwt.encode({
        exp: expires,
        user: user
    }, require('../config/secret')());

    return {
        token: token
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = Auth;
