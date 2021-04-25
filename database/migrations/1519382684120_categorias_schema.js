'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categorias', (table) => {
      table.increments('id').primary()
        table.string('nome').notNull()
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategorySchema
