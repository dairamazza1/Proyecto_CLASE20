const express = require('express');
const { Router } = express;
const productRouter = Router();

const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let product = new ProductoDaoArchivo();

// const { ProductoDaoFirebase } = require('../daos/productos/ProductosDaoFirebase');
// let product = new ProductoDaoFirebase();

// const { ProductoDaoMongoDB } = require('../daos/productos/ProductosDaoMongoDB');
// let product = new ProductoDaoMongoDB();

productRouter.get('/', (req, res) => {
    let products = product.getAll().then(obj => {
        res.json({allProducts: obj});       
    });   
});
productRouter.get("/:id", (req, res) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    let products = product.getProdById(id).then(obj => {
        res.json(obj);       
    });
});
productRouter.post('/', (req, res) => {
    let products = req.body;
    
    if (products && products.name && products.description && products.code && products.thumbnail && products.price && products.stock) {
        prod = product.save( products.name, products.description, products.code, products.thumbnail , products.price , products.stock).then(obj =>{
            res.json({result: 'Producto cargardo', producto: obj});
        });
       
    } else {
        res.json({result: 'No fue posible cargar el producto'});
    }
});
productRouter.put('/:id', (req,resp) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try{
        const prodAux = product.updateByID(id,req.body).then( () =>{
            let aux = product.getProdById(id).then( result =>{
                resp.json({result}); 
            })
        })
    }catch(err){
        resp.send('No se puede actualizar el producto')
    }   
}) 
productRouter.delete('/:id', (req,resp) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try{    
        const prodAux = product.deleteById(id);
        resp.send('Producto eliminado con exito')
    }catch(err){
        resp.send('No se encontró el producto')
    }   
}) 

module.exports = productRouter;