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
  

  //Rota que preciso passar um id e me retorna o usuário daquele id
Route
  .get('users/:id', 'AuthController.show')
  .middleware('auth')

  //Rota para listar clientes e vendedores onlines
  Route
  .get('users', 'AuthController.index')

  Route
  .delete('users/:id', 'AuthController.destroy')

  Route
  .put('users/:id', 'AuthController.update')

  // listagem de produtos de um vendedor 

  //Produtos, Categorias, Produtos_user
  Route.group(() => {
    Route.resource("produtos", "ProductController")
        .apiOnly()

    
        Route.resource("categorias", "CategoriasController")
        .apiOnly()
        .except("update");
    
        Route.resource("pedidos_produto", "PedidoProdutoController")
        .apiOnly()
    
        Route.resource("pedido", "PedidoController")
        .apiOnly()
        .except("update");
  })

  Route
  .put('produtos', 'ProductController.update')
  Route
  .delete('produtos', 'ProductController.destroy')











