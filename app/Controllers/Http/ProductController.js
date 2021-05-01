'use strict'
const Produtos = use("App/Models/Produtos");
const Database = use('Database')

class ProdutosController {

    async register_produtos({ request }){
        const data = request.only(['name']);
        const produtos = await Produtos.create(data);
        return produtos
    }

    async index(){
         return await Database
        .table('produtos')
        .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
        .select(
            'produtos.id',   
            'produtos.nome',
            'categorias.id',
            'categorias.nome'
        )
        
        }

    
    async show({params}){
        return await Produtos.find(params.id);
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
