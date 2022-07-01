'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

  connection: Env.get('DB_CONNECTION', 'postgres'),
  postgres: {
    client: 'postgres',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '542'),
      user: Env.get('DB_USER', 'postgres'),
      password: Env.get('DB_PASSWORD', 'postgres'),
      database: Env.get('DB_DATABASE', 'beach_service')
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
