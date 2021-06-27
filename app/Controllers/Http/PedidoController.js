'use strict'

var moment = require('moment'); // require
const { query } = require('../../Models/Pedido');
const Database=use("Database");

const {validateAll} = use("Validator");
const Pedido = use("App/Models/Pedido");
const User = use("App/Models/User");
const Produtos = use("App/Models/Produtos");
const pedido_produto = use("App/Models/PedidoProduto");


class PedidoController {
    async store ({ request,response}) {
        const rules = {
           
            lat:'required',
            lng:'required',
            id_consumidor:'required',
            id_vendedor:'required',
          }
          const  messages ={
          
            "lat.required":' latitude deve ser informado',
            "lng.required": 'longitude deve ser informado',
            "id_consumidor.required":' id do consumidor deve ser informado',
            "id_vendedor.required":" id do vendedor deve ser informado",
        }

        const validate = await validateAll(request.all(), rules, messages);
        if(validate.fails()){
            return response.status(401).send({message: validate.messages()})
          }
        
          const data = request.only(['data_hora_criado', 'data_hora_finalizado','lat','lng','id_consumidor','id_vendedor'])
          data.data_hora_criado= moment().format();
          const pedido = await Pedido.create(data);
          
          const produtoPedido = request.input('itens');
          produtoPedido.map(element => {
            element.pedido_id = pedido.id
          });
          console.log(produtoPedido)
          const pedido_produtoo = await pedido_produto.createMany(produtoPedido)

          return pedido 
        }
     
      
  /*   async index({request}){

      
      const id_user = request.only('id')
      const user = await User.findOrFail(id_user.id)
      const userJson = user.toJSON()
      if(userJson.tipo_user == 1){
        const pedido_= await Pedido.query().where('id_vendedor', userJson.id).with('produtos.categoria').fetch()
        const pedidoJson = pedido_.toJSON()
       pedidoJson.map(element => {
          element.id_vendedor = userJson
          
        });
       
        return pedidoJson
      
      }else if(userJson.tipo_user == 0){
        const pedido_= await Pedido.query().where('id_consumidor', userJson.id).with('produtos.categoria').fetch()
        const pedidoJson = pedido_.toJSON()
        const user = await User.findOrFail(pedidoJson[0].id_vendedor)
        pedidoJson.map(element => {
          element.id_consumidor = userJson
        });
        return pedidoJson
      }
      
    } */

/* 
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
} */
}

module.exports = PedidoController
