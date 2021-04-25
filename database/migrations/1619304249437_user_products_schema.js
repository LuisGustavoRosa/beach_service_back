'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProductsSchema extends Schema {
  up () {
    this.create('user_products', (table) => {
      table.increments('id').primary()
      table.integer('users_id').references('id').inTable('users')
      table.timestamps()
     
    })
  }

  down () {
    this.drop('user_products')
  }
}

module.exports = UserProductsSchema
