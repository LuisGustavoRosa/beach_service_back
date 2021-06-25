'use strict'

var moment = require('moment'); // require

const {validateAll} = use("Validator");
const Pedido = use("App/Models/Pedido");


class PedidoController {
    async store ({ request,response}) {
        const rules = {
            data_hora_criado:'required',
            data_hora_finalizado :'required',
            lat:'required',
            lng:'required',
            id_consumidor:'required',
            id_vendedor:'required',
          }
          const  messages ={
            "data_hora_criado.required":'dataHoraCriado deve ser informado',
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
          console.log(data.data_hora_criado)
          return pedido;
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
