'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubcategoriasSchema extends Schema {
  up () {
    this.create('subcategorias', (table) => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.integer('categoria_id').references('id').inTable('categorias').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('subcategorias')
  }
}

module.exports = SubcategoriasSchema
