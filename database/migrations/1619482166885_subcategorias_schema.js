'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubcategoriasSchema extends Schema {
  up () {
    this.create('subcategorias', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('subcategorias')
  }
}

module.exports = SubcategoriasSchema
