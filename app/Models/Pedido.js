'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
    pedidos() {
        return this.belongsToMany("App/Models/Pedidos").pivotTable(
          'pedido_produtos'
        );       
}
produtos() {
  return this.hasMany("App/Models/Produtos");
}

}

module.exports = Pedido
