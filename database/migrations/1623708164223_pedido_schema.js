'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.date('dataHoraCriado').notNullable()
      table.date('dataHoraFinalizado')
      table.decimal('lat',15,8).notNullable()
      table.decimal('lng',15,8).notNullable()
      table.integer('id_consumidor').unsigned().references('id').inTable('users').notNull()
      table.integer('id_vendedor').unsigned().references('id').inTable('users').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
