// Update with your config settings.

module.exports = {

  
    client: 'mysql',
    connection: {
      database:"beach_service",
      user:"root",
      password : ''
    },
  
    migrations: {
      tableName: 'knex_migrations'
    }
    
  };
  


