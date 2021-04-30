"use strict";

const Route = use("Route");

Route.post('/login',"UserController.login");
Route.post("/register", "AuthController.register");
Route.post("/register_produtos", "ProductController.register_produtos");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(()=>{
    Route.resource("users","UserController").apiOnly();
}).middleware('auth');


// Produtos

Route.group(()=>{
    Route.resource("produtos","ProductController").apiOnly();
})


Route
  .post('users', 'UserController.store')
  .validator('User')








