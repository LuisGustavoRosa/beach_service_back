"use strict";

const User = use("App/Models/User");

const {validateAll} = use("Validator");


class AuthController {
  async register({ request, response }) {

    const rules = {
      username:'required',
      email:'required',
      password:'required',
      cep:'required',
      telefone:'required',
      data_nascimento:'required',
      tipo_user:'required'
    }

    const  messages ={
        "username.required":'O nome deve ser informado',
        "email.required":' O email deve ser informado',
        "password.required": 'A senha deve ser informada',
        "cep.required":" O CEP deve ser informado",
        "telefone.required": "O telefone deve ser informado",
        "data_nascimento.required": "Precisa informar a data de nascimento",
        "tipo_user":"Precisa informar o tipo de usuário"
    }

    const validate = await validateAll(request.all(), rules, messages);

    if(validate.fails()){
      return response.status(401).send({message: validate.messages()})
    }
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
