"use strict";

const ProdutosController = require("../app/Controllers/Http/ProductController");


const Route = use("Route");

//Rota Login do user que faz a autenticação
Route
  .post('users/auth', 'AuthController.authenticate')

//Rota que faz o registro do usuário
Route
  //.post("users", "AuthController.store")
  .post("users", "AuthController.store")
  .middleware('auth')


//Rota que preciso passar um id e me retorna o usuário daquele id

Route.group(() => {
  Route.resource("users", "AuthController")
    .apiOnly()
  Route.resource("pedido", "PedidoController")
    .apiOnly()
}).middleware('auth')
Route.put("pedido_finalizado/:id", "PedidoController.pedido_finalizado")

// listagem de produtos de um vendedor 

//Produtos, Categorias, Produtos_user

Route.get("produtos", "ProductController.index")
Route.get("produtos/:id", "ProductController.show")
  .middleware('auth')
Route.put("produtos", "ProductController.store")
  .middleware('auth')













