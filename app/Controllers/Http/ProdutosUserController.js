'use strict'

const Produto_User = use ("App/Models/ProdutosUser")
class ProdutosUserController {
  
  async store ({ request}) {
    const data = request.input('produtos');
    console.log(data)
    const produto_user = await Produto_User.createMany(data)
    return produto_user;
  }
}
module.exports = ProdutosUserController
