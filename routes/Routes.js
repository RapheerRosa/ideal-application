'use strict';
var express 		= require('express');
var router 			= express.Router();

var auth 				= require('./Auth.js'),
	clients 			= require('./Clients.js'),
	suppliers 		= require('./Suppliers.js'),
	manufacturers = require('./Manufacturers.js'),
	products 			= require('./Products.js'),
	utils					= require('./Utils.js'),
	urlRoot 			= '/rest';

router.post('/authenticate', auth.login);

//Utils Routes
router.get(urlRoot + '/countries/get/all', utils.searchCountries);
router.get(urlRoot + '/countries/get/:countryId', utils.getCountry);
router.get(urlRoot + '/states/search/:countryId', utils.searchStates);
router.get(urlRoot + '/cities/search/:stateId', utils.searchCities);
router.get(urlRoot + '/states/get/:stateId', utils.getState);
router.get(urlRoot + '/cities/get/:cityId', utils.getCity);

// Clients Routes
router.get(urlRoot + '/clients/search/:args', clients.search);
router.get(urlRoot + '/clients/list/all/:limit/:offset/:args?', clients.getAll);
router.get(urlRoot + '/clients/:id/contacts', clients.getAllContacts);
router.get(urlRoot + '/clients/:id/contacts/search/:args', clients.searchContacts);
router.get(urlRoot + '/clients/:id/contacts/:contactId', clients.getContact);
router.get(urlRoot + '/clients/:id/address', clients.getAllAddress);
router.get(urlRoot + '/clients/:id/address/search/:args', clients.searchAddress);
router.get(urlRoot + '/clients/:id/address/:addressId', clients.getAddress);
router.get(urlRoot + '/clients/:id', clients.get);

router.post(urlRoot + '/clients', clients.create);
router.post(urlRoot + '/clients/contacts', clients.createContact);
router.post(urlRoot + '/clients/address', clients.createAddress);

router.put(urlRoot + '/clients', clients.update);
router.put(urlRoot + '/clients/contacts/:contactId', clients.updateContact);
router.put(urlRoot + '/clients/address/:addressId', clients.updateAddress);

router.delete(urlRoot + '/clients/:id/contacts/:contactId', clients.removeContact);
router.delete(urlRoot + '/clients/:id/address/:addressId', clients.removeAddress);
router.delete(urlRoot + '/clients/:id', clients.remove);

// Suppliers Routes
router.get(urlRoot + '/suppliers/list/all/:limit/:offset/:args?', suppliers.getAll);
router.get(urlRoot + '/suppliers/search/:args', suppliers.search);
router.get(urlRoot + '/suppliers/:id/contacts', suppliers.getAllContacts);
router.get(urlRoot + '/suppliers/:id/contacts/search/:args', suppliers.searchContacts);
router.get(urlRoot + '/suppliers/:id/contacts/:contactId', suppliers.getContact);
router.get(urlRoot + '/suppliers/:id/address', suppliers.getAllAddress);
router.get(urlRoot + '/suppliers/:id/address/search/:args', suppliers.searchAddress);
router.get(urlRoot + '/suppliers/:id/address/:addressId', suppliers.getAddress);
router.get(urlRoot + '/suppliers/:id', suppliers.get);

router.post(urlRoot + '/suppliers', suppliers.create);
router.post(urlRoot + '/suppliers/contacts', suppliers.createContact);
router.post(urlRoot + '/suppliers/address', suppliers.createAddress);

router.put(urlRoot + '/suppliers', suppliers.update);
router.put(urlRoot + '/suppliers/contacts', suppliers.updateContact);
router.put(urlRoot + '/suppliers/address', suppliers.updateAddress);

router.delete(urlRoot + '/suppliers/:id', suppliers.remove);
router.delete(urlRoot + '/suppliers/:id/contacts/:contactId', suppliers.removeContact);
router.delete(urlRoot + '/suppliers/:id/address/:addressId', suppliers.removeAddress);

// Manufacturers Routes
router.get(urlRoot + '/manufacturers/search/:args', manufacturers.search);
router.get(urlRoot + '/manufacturers/list/all', manufacturers.getAll);
router.get(urlRoot + '/manufacturers/:id', manufacturers.get);

router.post(urlRoot + '/manufacturers', manufacturers.create);

router.put(urlRoot + '/manufacturers', manufacturers.update);

router.delete(urlRoot + '/manufacturers/:id', manufacturers.remove);

// Products Routes
router.get(urlRoot + '/products/list/all/:limit/:offset/:args?', products.getAll);
router.get(urlRoot + '/products/search/:args', products.search);
router.get(urlRoot + '/products/:id', products.get);

router.post(urlRoot + '/products', products.create);

router.put(urlRoot + '/products', products.update);

router.delete(urlRoot + '/products/:id', products.remove);

module.exports = router;
