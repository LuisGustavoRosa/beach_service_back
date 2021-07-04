'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('empresa', 60)
      table.string('cep', 10).notNullable()
      table.string('telefone', 15).notNullable()
      table.date('data_nascimento').notNullable()
      table.integer('tipo_user', 0).notNullable()
      table.double('lat')
      table.double('lng')
      table.decimal('distance',12,8)
      table.boolean('online').default(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
