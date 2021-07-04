"use strict";


const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Database = use('Database')


class AuthController {





  async store({ request, response }) {

    const rules = {
      nome: 'required',
      email: 'required',
      password: 'required',
      empresa: 'required',
      cep: 'required',
      telefone: 'required',
      data_nascimento: 'required',
      tipo_user: 'required',
      online: 'required'
    }

    const messages = {
      "nome.required": 'O nome deve ser informado',
      "email.required": ' O email deve ser informado',
      "password.required": 'A senha deve ser informada',
      "empresa.required": ' A empresa deve ser informado',
      "cep.required": " O CEP deve ser informado",
      "telefone.required": "O telefone deve ser informado",
      "data_nascimento.required": "Precisa informar a data de nascimento",
      "tipo_user": "Precisa informar o tipo de usuário",
      "online": "Precisa informar o status"
    }

    const validate = await validateAll(request.all(), rules, messages);

    if (validate._data.tipo_user == 1) {
      console.log(validate._data.tipo_user)
      if (validate.fails()) {
        return response.status(401).send({ message: validate.messages() })
      }
      const data = request.only(['nome', 'email', 'password', 'empresa', 'cep', 'telefone', 'data_nascimento', 'tipo_user', 'lat', 'lng', 'online']);
      const user = await User.create(data);
      return user;

    } else if (validate._data.tipo_user == 0) {

      const rules = {
        nome: 'required',
        email: 'required',
        password: 'required',
        cep: 'required',
        telefone: 'required',
        data_nascimento: 'required',
        tipo_user: 'required',
        online: 'required'

      }

      const messages = {
        "nome.required": 'O nome deve ser informado',
        "email.required": ' O email deve ser informado',
        "password.required": 'A senha deve ser informada',
        "cep.required": " O CEP deve ser informado",
        "telefone.required": "O telefone deve ser informado",
        "data_nascimento.required": "Precisa informar a data de nascimento",
        "tipo_user": "Precisa informar o tipo de usuário",
        "online": "Precisa informar o status"
      }
      const validate = await validateAll(request.all(), rules, messages);
      if (validate.fails()) {
        return response.status(401).send({ message: validate.messages() })
      }
      const data = request.only(['nome', 'email', 'password', 'empresa', 'cep', 'telefone', 'data_nascimento', 'tipo_user', 'lat', 'lng', 'online']);
      const user = await User.create(data);
      return user;
    }
  }
  async authenticate({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    await auth
      .withRefreshToken()
      .attempt(email, password)
    return token
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);
    return user;
  }

  async index({ request }) {

    const { tipo_user, lat, lng } = request.all()

    if (tipo_user == 1) {
      const users = await User.query()
        .where(function () {
          this.where('online', 1)
          this.where('tipo_user', 0)
        }).nearBy(lat, lng, 1000).fetch()
      const userJSON_ = await users.toJSON()
        
        userJSON_.map(e => {
          e.distance = parseFloat((e.distance*1000).toFixed(2))
        })
        return userJSON_
     
    }else if (tipo_user == 0) {
      const users = await User.query().with('produtos.categoria').where(
        function () {
          this.where('online', 1)
          this.where('tipo_user', 1)
        }).nearBy(lat, lng, 1000).fetch()
         const userJSON_ = await users.toJSON()
        userJSON_.map(e => {
          e.distance = parseFloat((e.distance*1000).toFixed(2))
        })
        return userJSON_
      }
  
  }
  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const dataToUpdate = request.only(['nome', 'email', 'password', 'empresa', 'cep', 'telefone', 'data_nascimento', 'tipo_user', 'lat', 'lng', 'online']);
    user.merge(dataToUpdate);
    await user.save();
    return user;
  }
  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return {
      message: 'Usuário Excluido'
    }
  }
}
module.exports = AuthController;
