'use strict'

const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categorias', (table) => {
        table.increments()  
        table.string('descricao').notNullable()
        table.timestamps()
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategorySchema
