'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up() {
    this.create('pedidos', (table) => {
      table.increments()
      table.dateTime('data_hora_criado')
      table.dateTime('data_hora_finalizado')
      table.integer('status').notNullable()
      table.double('lat').notNullable()
      table.double('lng').notNullable()
      table.integer('id_consumidor').unsigned().references('id').inTable('users').notNull()
      table.integer('id_vendedor').unsigned().references('id').inTable('users').notNull()
      table.timestamps()
    })
  }

  down() {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
