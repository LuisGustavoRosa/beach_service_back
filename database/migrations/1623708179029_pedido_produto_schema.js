'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoProdutoSchema extends Schema {
  up () {
    this.create('pedido_produtos', (table) => {
      table.increments()
      table.integer('id_pedido').unsigned().references('id').inTable('pedidos').notNull()
      table.integer('id_produto').unsigned().references('id').inTable('produtos').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_produtos')
  }
}

module.exports = PedidoProdutoSchema
