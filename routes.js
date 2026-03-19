const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cestaController = require('./src/controllers/cestaController');

route.get('/', homeController.index);
route.get('/cesta', cestaController.index);
route.post('/cesta', cestaController.registrar);
module.exports = route; 