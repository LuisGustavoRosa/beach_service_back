'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produtos extends Model {
    
    categorias(){
        return this.belongsTo('App/Models/Categorias')
    }
    user(){
        return this.belongsTo('App/Models/User')
    }

   // static scopeAlias(query){
   //     return query.select(['descricao','categoria_id'])
  //  }
}


module.exports = Produtos
