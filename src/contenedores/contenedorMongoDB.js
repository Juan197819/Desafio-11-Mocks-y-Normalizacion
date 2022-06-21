import mongoose from 'mongoose'

try {
    const url = 'mongodb://127.0.0.1:27017/ecommerce' 
    await mongoose.connect(url)
    console.log('Base de datos MongoDB conectada')
} catch (error) {
    console.log('Error en la conexion de MongoDB', error)
}

class ContenedorMongoDb{
    constructor(nombreColleccion, Schema){
        this.colleccion = mongoose.model(nombreColleccion, Schema)
    }
    async leer(id, propiedad){
        let parametroBusqueda = {}
        if(id){parametroBusqueda = {'_id' :id} } 
        const productos= await this.colleccion.find(parametroBusqueda, {__v:0})
        
        //console.log(productos)
        return productos
    }
    //---- A CONTINUACION DEJO OTRA FORMA DE GUARDAR (Aclaracion: no se cual es la diferencia entre ambas....jaja)
    // async guardar(datos) {
    //     let productoAgregado = new this.colleccion(datos)
    //     let productoAgregadoOk = await productoAgregado.save()
    //     console.log(productoAgregadoOk)
    //     return productoAgregadoOk
    // }
    async guardar(datos) {
        let productoAgregado = await this.colleccion.create(datos)
        return productoAgregado
    }
    async modificar(productoAnterior, productoModificado,tipoDeModificacion) {
        switch (tipoDeModificacion) {
            case '$set':
                return await this.colleccion.updateOne(productoAnterior,{$set: productoModificado})
            case '$push':
                return await this.colleccion.updateOne(productoAnterior,{$push: productoModificado})
            default:
                break;
        }
        
    }
    async eliminar(id){
        let parametroBusqueda = {'_id' :id} 
        const productos= await this.colleccion.deleteOne(parametroBusqueda)
        return productos
    }




}
export default ContenedorMongoDb