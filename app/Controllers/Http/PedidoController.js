'use strict'

const {validateAll} = use("Validator");
const Pedido = use("App/Models/Pedido");

class PedidoController {
    async store ({ request,response}) {
        const rules = {
            dataHoraCriado:'required',
            dataHoraFinalizado :'required',
            lat:'required',
            lng:'required',
            id_consumidor:'required',
            id_vendedor:'required',
          }
          const  messages ={
            "dataHoraCriado.required":'dataHoraCriado deve ser informado',
            "lat.required":' latitude deve ser informado',
            "lng.required": 'longitude deve ser informado',
            "id_consumidor.required":' id do consumidor deve ser informado',
            "id_vendedor.required":" id do vendedor deve ser informado",
        }

        const validate = await validateAll(request.all(), rules, messages);
        if(validate.fails()){
            return response.status(401).send({message: validate.messages()})
          }
          const data = request.only(['dataHoraCriado', 'dataHoraFinalizado','lat','lng','id_consumidor','id_vendedor'])
          const pedido = await Pedido.create(data);
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
