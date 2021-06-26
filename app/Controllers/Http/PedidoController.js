'use strict'

var moment = require('moment'); // require

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
          
          const produtoPedido = request.input('pedidos');
          produtoPedido.map(element => {
            element.pedido_id = pedido.id
          });
          console.log(produtoPedido)
          const pedido_produtoo = await pedido_produto.createMany(produtoPedido)

          return pedido 
        }
     
      
    async show({params}){
       
      const user = await User.findOrFail(params.id);
      console.log(user)
      const pedido = await user.produtos().with("pedidos").fetch()
      console.log(pedido)
      return pedido
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

module.exports = PedidoController
