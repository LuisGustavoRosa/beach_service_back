'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
  produtos() {
    return this.belongsToMany("App/Models/Produtos").pivotTable(
      'produtos_users'
    );
  }
}

module.exports = Categoria
