"use strict";


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
  .get('users', 'AuthController.getById')

//Produtos, Categorias, Produtos_user
Route.group(() => {
    Route.resource("produtos", "ProductController")
        .apiOnly()
        .except("update");

      Route.resource("categorias", "CategoriasController")
        .apiOnly()
        .except("update");
  })









