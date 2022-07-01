'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

  connection: Env.get('DB_CONNECTION', 'postgres'),
  postgres: {
    client: 'postgres',
    connection: {
      host: Env.get('DB_HOST', ''),
      port: Env.get('DB_PORT', '542'),
      user: Env.get('DB_USER', ''),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', '')
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
