'use strict'


const Model = use('Model')
class ProdutosUser extends Model {
    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = ProdutosUser
