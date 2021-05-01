'use strict'
const Produtos = use("App/Models/Produtos");


class ProdutosController {

    async store({ request }){
        const data = request.only(['name']);
        const produtos = await Produtos.create(data);
        return produtos
    }

    async index() {
        const produtos = await Produtos.query()
          .with("categorias")
          .fetch();
        return produtos;
      }
      
    async show({params}){
        return await Produtos.query(params.id)
    }

    async update ({params, request}){
        const Produtos = await Produtos.findOrFail(params.id);
        const dataToUpdate= request.only(['name']);
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
