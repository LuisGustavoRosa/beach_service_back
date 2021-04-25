'use strict'
const Product = use("App/Models/Product");
class ProductController {

    async register_product({ request }){
        
        const data = request.only(['name']);
        const product = await Product.create(data);
        
        return product
    }

    async index(){
        return await Product.all();
    }

    async show({params}){
        return await Product.find(params.id);
    }

    async update ({params, request}){
        const product = await Product.findOrFail(params.id);

        const dataToUpdate= request.only(['name']);

        product.merge(dataToUpdate);

        await product.save();

        return product;
    }

    async destroy({params}){
        const product = await Product.findOrFail(params.id);

        await product.delete();

        return {
            message: 'Produto Excluido'
        }
    }
}

module.exports = ProductController
