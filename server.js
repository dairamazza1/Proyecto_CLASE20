const express = require('express')

const productsRoutes = require('./src/routes/productsRoutes');
const cartRoutes = require('./src/routes/carritoRoutes');

const app = express();

app.use(express.json()); //tiene q estar para qe se llene el req body
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartRoutes);
app.get('*', function (req,res) {
    res.status(404).send({
        status: "error",
        data: "404: Page not found",
        error: -2,
        description: "Ruta "+ req.baseUrl + req.path +" no implementada"
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const server = app.listen(8080, () => {
    console.log('La aplicacion esta escuchando');
})
