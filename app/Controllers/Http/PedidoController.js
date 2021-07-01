'use strict'

var moment = require('moment'); // require
const { query } = require('../../Models/Pedido');
const Database = use("Database");

const { validateAll } = use("Validator");
const Pedido = use("App/Models/Pedido");
const User = use("App/Models/User");
const Produtos = use("App/Models/Produtos");
const pedido_produto = use("App/Models/PedidoProduto");


class PedidoController {
  async store({ request, response }) {
    const rules = {

      lat: 'required',
      lng: 'required',
      status: 'required',
      id_consumidor: 'required',
      id_vendedor: 'required',
    }
    const messages = {

      "lat.required": ' latitude deve ser informado',
      "lng.required": 'longitude deve ser informado',
      "status.required": 'status precisa ser definido',
      "id_consumidor.required": ' id do consumidor deve ser informado',
      "id_vendedor.required": " id do vendedor deve ser informado",

    }

    const validate = await validateAll(request.all(), rules, messages);
    if (validate.fails()) {
      return response.status(401).send({ message: validate.messages() })
    }

    const data = request.only(['data_hora_criado', 'data_hora_finalizado', 'lat', 'lng', 'status', 'id_consumidor', 'id_vendedor'])
    data.data_hora_criado = moment().format();
    data.status = 'em aberto'
    const pedido = await Pedido.create(data);

    const produtoPedido = request.input('itens');
    produtoPedido.map(element => {
      element.pedido_id = pedido.id
    });
    console.log(produtoPedido)
    const pedido_produtoo = await pedido_produto.createMany(produtoPedido)

    return pedido
  }


  async index({ request }) {
    const json = request.only(["id"])

    const sql = await Pedido.query()
      .select('pedidos.id')
      .select('pedidos.lat')
      .select('pedidos.lng')
      .select('pedidos.status')
      .select('pedidos.data_hora_criado')
      .select('pedidos.data_hora_finalizado')
      .select('user_vendedor.id as vendedor_id')
      .select('user_vendedor.nome as vendedor_nome')
      .select('user_vendedor.email as vendedor_email')
      .select('user_vendedor.empresa as vendedor_empresa')
      .select('user_vendedor.telefone as vendedor_telefone')
      .select('user_consumidor.id as consumidor_id')
      .select('user_consumidor.nome as consumidor_nome')
      .select('user_consumidor.email as consumidor_email')
      .select('user_consumidor.telefone as consumidor_telefone')
      .from('pedidos')
      .innerJoin({ user_consumidor: 'users' }, (query) => {
        query.on('user_consumidor.id', '=', 'pedidos.id_consumidor')
      })
      .innerJoin({ user_vendedor: 'users' }, (query) => {
        query.on('user_vendedor.id', '=', 'pedidos.id_vendedor')
      })
      .whereRaw('pedidos.id_consumidor = ? OR pedidos.id_vendedor = ?', [json.id, json.id])
      .with('produtos.categoria')
      .fetch();

    if (sql != null) {
      const json = sql.toJSON();

      json.map(e => {
        e.user_consumidor = {
          "id": e.vendedor_id,
          "nome": e.vendedor_nome,
          "email": e.vendedor_email,
          "empresa": e.vendedor_empresa,
          "telefone": e.vendedor_telefone
        },
          delete e.vendedor_id;
        delete e.vendedor_nome;
        delete e.vendedor_email;
        delete e.vendedor_empresa;
        delete e.vendedor_telefone;

        e.user_vendedor = {
          "id": e.consumidor_id,
          "nome": e.consumidor_nome,
          "email": e.consumidor_email,
          "telefone": e.consumidor_telefone
        }
        delete e.consumidor_id;
        delete e.consumidor_nome;
        delete e.consumidor_email;
        delete e.consumidor_telefone;
      });

      return json;
    }

    return null;
  }


  async update({ params, request }) {
    const status = request.only('status')
    console.log(status.status)
    const pedido_ = await Pedido.findOrFail(params.id)
    var pedidoJson = pedido_.toJSON()
    const pedido = pedidoJson
    
  
    if (status.status == 0) {
      pedido.status = 'cancelado'
    } else if (status.status == 1) {
      pedido.status = 'em aberto'
    } else if (status.status == 2) {
      pedido.status = 'aceito'
    } else if (status.status == 3 ) {
      pedido.status = 'finalizado'
      pedido.data_hora_finalizado = moment().format();
    }
    pedido_.merge(pedidoJson);
    await pedido_.save();
    return pedido_;

    
  }

  async pedido_finalizado({ params }) {

    const pedido = await Pedido.findOrFail(params.id);
    pedido.data_hora_finalizado = moment().format();
    await pedido.save();
    return pedido;
  }

}

module.exports = PedidoController
