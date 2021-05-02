"use strict";


const Route = use("Route");

//Rota Login do user que faz a autenticação
Route
  .post('users/auth', 'AuthController.authenticate')
  
//Rota que faz o registro do usuário
Route
  //.post("users", "AuthController.store")
  .post("users", "AuthController.store")

//Rota que faz a listagem de todos os usuários
Route
  .get("users", "AuthController.index")
  .middleware('auth')
  //Rota que preciso passar um id e me retorna o usuário daquele id
Route
  .get('users/:id', 'AuthController.show')
  .middleware('auth')
  
  


//Produtos, Categorias, Produtos_user
Route.group(() => {
    Route.resource("produtos", "ProductController")
        .apiOnly()
        .except("update");

      Route.resource("categorias", "CategoriasController")
        .apiOnly()
        .except("update"); 
      
      Route.resource("produtos_user", "ProdutosUserController")
        .apiOnly()
        .except("update");
  }).middleware('auth');









