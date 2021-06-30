'use strict'
const Produtos = use("App/Models/Produtos");
const Produto_User = use ("App/Models/ProdutosUser")
const User = use("App/Models/User");
const Database = use('Database')


class ProdutosController {

    async store ({ request}) {
      const user_produtos = request.input('produtos');

      const produtouser =  await Produto_User.query()
      .where(function () {
        this.where('user_id', user_produtos[0].user_id)
      }).fetch()
       if(produtouser == null){
          const produto_user = await Produto_User.createMany(user_produtos)
          return produto_user;
       }else{
          var produto_user =  await Produto_User.query()
          .where(function () {
            this.where('user_id', user_produtos[0].user_id)
        }).delete()
          produto_user = await Produto_User.createMany( user_produtos)
          return produto_user;
       }       
      }
    async index() {
        const produtos = await Produtos.query()
          .with("categoria")
          .fetch();
        return produtos;
      }
      
    async show({params}){
      const user = await User.findOrFail(params.id);
      const produtos = await user.produtos().with("categoria").fetch();
      return produtos;
    }
    
  }

module.exports = ProdutosController
