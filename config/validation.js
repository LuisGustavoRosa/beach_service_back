module.exports = app =>{
    function igual(valueA,valueB, msg){
        if(valueA !==valueB) throw msg 
    }
    function existe(value, msg){
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    function naoExiste(value, msg){
        try{
            existe(value)
        }catch(msg){
            return
        }
        throw
    }

    return{igual, existe, naoExiste}
}