"use strict";

const AuthController = require("../app/Controllers/Http/AuthController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");


//Usuário

Route.post("/register", "AuthController.register");
Route.post("/register_product", "ProductController.register_product");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(()=>{
    Route.resource("users","AuthController").apiOnly();
}).middleware('auth');


Route.group(()=>{
    Route.resource("products","ProductController").apiOnly();
})

//rota se chamna login usando a class UserController com o metodo login
Route.post('/login',"UserController.login");








