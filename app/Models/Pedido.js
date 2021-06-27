'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {

produtos() {
  return this.belongsToMany("App/Models/Produtos").pivotTable(
    'pedido_produtos'
  );
}
user() {
  return this.belongsToMany("App/Models/User").pivotTable(
    'users' 
  );
}
}

module.exports = Pedido
