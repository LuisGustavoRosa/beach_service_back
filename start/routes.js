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
Route.put("users", 'AuthController.update')
  .middleware('auth')


// listagem de produtos de um vendedor 

//Produtos, Categorias, Produtos_user

Route.get("produtos", "ProductController.index")
Route.get("produtos/:id", "ProductController.show")
  .middleware('auth')
Route.put("produtos", "ProductController.store")
  













