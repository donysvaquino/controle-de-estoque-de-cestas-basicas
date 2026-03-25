const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cestaController = require('./src/controllers/cestaController');
const produtosController = require('./src/controllers/produtosController');

route.get('/', homeController.index);

//Rotas de cestas
route.get('/cadastrar/cestas', cestaController.cadastrar);
route.get('/listar/cestas', cestaController.listar);
route.post('/cadastrar/cestas', cestaController.registrar);

//Rotas de produtos
route.get('/cadastrar/produtos', produtosController.cadastrar);
route.get('/listar/produtos', produtosController.listar);
route.post('/cadastrar/produtos', produtosController.registrar);

//Adicionar
route.get('/estoque/produtos/add/:id', produtosController.add);

//Remover
route.get('/estoque/produtos/remove/:id', produtosController.remove);
module.exports = route; 