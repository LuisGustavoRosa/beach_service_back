"use strict";

const ProdutosController = require("../app/Controllers/Http/ProductController");


const Route = use("Route");

//Rota Login do user que faz a autenticação
Route
  .post('users/auth', 'AuthController.authenticate')

Route.group(() => {
  Route.resource("pedido", "PedidoController")
    .apiOnly()
}).middleware('auth')

Route.post("users", "AuthController.store")
Route.get("users", 'AuthController.index')
  .middleware('auth')
Route.get("users/:id", 'AuthController.index')
  .middleware('auth')
Route.put("users/:id", 'AuthController.update')
  .middleware('auth')
Route.post("produtos","ProductController.store")



// listagem de produtos de um vendedor 

//Produtos, Categorias, Produtos_user

Route.get("produtos", "ProductController.index")
Route.get("produtos/:id", "ProductController.show")
  .middleware('auth')
Route.put("produtos", "ProductController.store")
  













