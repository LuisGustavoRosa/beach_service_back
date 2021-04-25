"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only(['id','username', 'email', 'password','cep','telefone','data_nascimento','tipo_user']);

    const user = await User.create(data);

    return user;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return token;
  }
 
 async index(){
   const users= await User.all();

   return users;
 }

async show({params}){
    return await User.find(params.id);
}

async update ({params, request}){
    const user = await User.findOrFail(params.id);

    const dataToUpdate= request.only(['name', 'email','password','cep','telefone','data_nascimento']);

    user.merge(dataToUpdate);

    await user.save();

    return user;
}

async destroy({params}){
    const user = await User.findOrFail(params.id);

    await user.delete();

    return {
        message: 'Usuário Excluido'
    }
}
  



}

module.exports = AuthController;
