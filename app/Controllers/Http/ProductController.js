'use strict'
const Produtos = use("App/Models/Produtos");
const Produto_User = use ("App/Models/ProdutosUser")
const User = use("App/Models/User");


class ProdutosController {

    async store ({ request}) {
        const user_produtos = request.input('produtos');
        const produto_user = await Produto_User.createMany( user_produtos)
        return produto_user;
      }


    async index() {
        const produtos = await Produtos.query()
          .with("categorias")
          .fetch();
        return produtos;
      }
      
    async show({params}){
      const user = await User.findOrFail(params.id);
      const produtos = await user.produtos().with("categorias").fetch();
      return produtos;
    }

    async update ({params, request}){
        const Produtos = await Produtos.findOrFail(params.id);
        const dataToUpdate= request.only(['descricao']);
        Produtos.merge(dataToUpdate);
        await Produtos.save();
        return Produtos;
    }

    async destroy({params}){
        const Produtos = await Produtos.findOrFail(params.id);
        await Produtos.delete();
        return {
            message: 'Produto Excluido'
        }
     }   
}

module.exports = ProdutosController
