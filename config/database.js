

const fs = require('fs')

const Env = use('Env')

/**************************************************************************
* CONFIG > DATABASE
***************************************************************************/

const config = {
 connection: Env.get('DB_CONNECTION', 'pg'),

 pg: {
   client: 'pg',

   connection: {
     host: Env.get('DB_HOST', 'localhost'),
     port: Env.get('DB_PORT', ''),
     user: Env.get('DB_USER', 'postgres'),
     password: Env.get('DB_PASSWORD', ''),
     database: Env.get('DB_DATABASE', 'beach_service'),
   },

   debug: Env.get('DB_DEBUG', false),
 },
}

// Add certificate for production environment
if (Env.get('NODE_ENV') === 'production') {
 config.pg.connection.ssl = {
   ca: fs.readFileSync(__dirname + '/certs/ca-database.crt'),
 }
}

module.exports = config
