"use strict";

const Route = use("Route");


//Usuário

Route.post("/register", "AuthController.register");
Route.post("/register_produtos", "ProductController.register_produtos");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(()=>{
    Route.resource("users","AuthController").apiOnly();
}).middleware('auth');


Route.group(()=>{
    Route.resource("produtos","ProductController").apiOnly();
})

//rota se chamna login usando a class UserController com o metodo login
Route.post('/login',"UserController.login");

Route
  .post('users', 'UserController.store')
  .validator('User')








