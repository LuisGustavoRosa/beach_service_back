"use strict";


const User = use("App/Models/User");
const {validateAll} = use("Validator");


class AuthController {

  async store({ request, response }) {

    const rules = {
      nome:'required',
      email:'required',
      password:'required',
      empresa:'required',
      cep:'required',
      telefone:'required',
      data_nascimento:'required',
      tipo_user:'required'
    }

    const  messages ={
        "nome.required":'O nome deve ser informado',
        "email.required":' O email deve ser informado',
        "password.required": 'A senha deve ser informada',
        "empresa.required":' A empresa deve ser informado',
        "cep.required":" O CEP deve ser informado",
        "telefone.required": "O telefone deve ser informado",
        "data_nascimento.required": "Precisa informar a data de nascimento",
        "tipo_user":"Precisa informar o tipo de usuário"
    }

    
     
    const validate = await validateAll(request.all(), rules, messages);
    

    
    if(validate._data.tipo_user == 1){
      console.log(validate._data.tipo_user)
      if(validate.fails()){
        return response.status(401).send({message: validate.messages()})
      }
      const data = request.only(['id','nome', 'email', 'password','empresa','cep','telefone','data_nascimento','tipo_user']);
      const user = await User.create(data);
      return user;
    
    }else if(validate._data.tipo_user == 0){

      const rules = {
        nome:'required',
        email:'required',
        password:'required',
        cep:'required',
        telefone:'required',
        data_nascimento:'required',
        tipo_user:'required'
      }
  
      const  messages ={
          "nome.required":'O nome deve ser informado',
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
      const data = request.only(['id','nome', 'email', 'password','cep','telefone','data_nascimento','tipo_user']);
      const user = await User.create(data);
      return user;
    }
    
  }

  async authenticate({ request, auth }) {
    const {email, password } = request.all();
    const token = await auth.attempt(email, password);
    await auth
    .withRefreshToken()
    .attempt( email, password)    
    return token
  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "Usuário não autenticado"
    }
    const data  = {'id':auth.user.id,'nome':auth.user.nome, 'email':auth.user.email, 
                  'empresa':auth.user.empresa,'cep':auth.user.cep,'telefone':auth.user.telefone, 
                  'data_nascimento':auth.user.data_nascimento,'tipo_user':auth.user.tipo_user}
    return data
  }
 
  async index(){
    const users= await User.all();
    return users;
  }

async update ({params, request}){
    const user = await User.findOrFail(params.id);
    const dataToUpdate= request.only(['nome', 'email','password','empresa','cep','telefone','data_nascimento']);
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
