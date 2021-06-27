'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoProdutoSchema extends Schema {
  up () {
    this.create('pedido_produtos', (table) => {
      table.integer('pedido_id').unsigned().references('id').inTable('pedidos').notNull()
      table.integer('produto_id').unsigned().references('id').inTable('produtos').notNull().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_produtos')
  }
}

module.exports = PedidoProdutoSchema
