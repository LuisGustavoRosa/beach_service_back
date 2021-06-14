"use strict";

const Hash = use("Hash");
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }
  
  static formatDates (field, value) {
    if (field === 'dob') {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  produtos() {
    return this.belongsToMany("App/Models/Produtos").pivotTable(
      'produtos_users'
    );
  }
  produtos_user() {
    return this.hasMany("App/Models/ProdutosUser");
  }

}


module.exports = User;
