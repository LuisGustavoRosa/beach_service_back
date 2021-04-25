'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments('id').primary()
      table.string('codigo').notNull()
      table.string('nome').notNull()
      table.integer('categoria_id').references('id').inTable('categorias')
      table.timestamps()

    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
