"use strict";

const Route = use("Route");


// Route.post("/register", "AuthController.register");
Route.post("/register_produtos", "ProductController.register_produtos");
Route.post("/authenticate", "AuthController.authenticate");



Route.group(()=>{
    Route.resource("users","AuthController").apiOnly();
});


// Produtos

Route.group(() => {
    Route.resource("produtos", "ProductController")
      .apiOnly()
      .except("update");

      Route.resource("categorias", "CategoriasController")
      .apiOnly()
      .except("update"); 
  }).middleware(["auth"]);

  Route.resource("produtos_user", "ProdutosUserController")
      .apiOnly()
      .except("update");








Route

  //.post('users', 'UserController.store')
 // .validator('User')








