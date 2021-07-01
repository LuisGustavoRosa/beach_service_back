'use strict'


const Model = use('Model')
class ProdutosUser extends Model {
    produtos() {
        return this.hasMany("App/Models/Produtos");
    }
    user() {
        return this.belongsTo('App/Models/User')
    }
    categorias() {
        return this.belongsTo('App/Models/Categorias')
    }
}

module.exports = ProdutosUser
