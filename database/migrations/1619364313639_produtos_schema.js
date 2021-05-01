'use strict'


const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('descricao', 64).notNullable()
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProductsSchema
