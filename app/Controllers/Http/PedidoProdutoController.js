'use strict'
const pedido_produto = use("App/Models/PedidoProduto");

class PedidoProdutoController {
    async store ({ request}) {

        const produto_pedido = request.input('pedidos');
        const pedido_produtoo = await pedido_produto.createMany( produto_pedido)
        return pedido_produtoo;
      }
}

module.exports = PedidoProdutoController
