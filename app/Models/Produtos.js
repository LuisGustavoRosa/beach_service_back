'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produtos extends Model {

    categoria() {
        return this.belongsTo('App/Models/Categorias')
    }
    user() {
        return this.belongsTo('App/Models/User')
    }
    pedidos() {
        return this.belongsToMany("App/Models/Pedido").pivotTable(
            'pedido_produtos'
        );
    }
}


module.exports = Produtos
