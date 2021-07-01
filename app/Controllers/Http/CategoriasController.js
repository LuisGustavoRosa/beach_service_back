'use strict'
const Categorias = use("App/Models/Categorias");


class CategoriaController {


  async index() {
    const categorias = await Categorias.all();
    return categorias;
  }

  async create({ request, response, view }) {
  }

  async store({ request }) {
    const data = request.only(["descricao"]);
    const tweet = await Categorias.create(data);

    return tweet;
  }


}
module.exports = CategoriaController
