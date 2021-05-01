'use strict'

const Produto_User = use ("App/Models/ProdutosUser")
class ProdutosUserController {
  
  async store ({ request}) {
    const data = request.only(["user_id","produtos_id"]);
    const produto_user = await Produto_User.create(data)
      
    return produto_user;
  }

 
 
}

module.exports = ProdutosUserController
