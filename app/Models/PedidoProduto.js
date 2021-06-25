'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PedidoProduto extends Model {
    produtos() {
        return this.hasMany("App/Models/Produtos");
      }
    pedidos() {
        return this.hasMany("App/Models/Pedido");
      }

}

module.exports = PedidoProduto
