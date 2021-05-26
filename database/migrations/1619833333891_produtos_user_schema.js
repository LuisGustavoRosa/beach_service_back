'use strict'


const Schema = use('Schema')

class ProdutosUserSchema extends Schema {
  up () {
    this.create('produtos_users', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').notNull()
      table.integer('produto_id').unsigned().references('id').inTable('produtos').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos_users')
  }
}

module.exports = ProdutosUserSchema
