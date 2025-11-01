import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/productsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import conectionMongo from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/////////////conectar a mongo///////////
conectionMongo();

//////////////////usar midelwares///////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/////////rutas y error personalizado///////////////
app.use('/api/products', productsRouter);

////////recibe todas las rutas no antendidas anteiormente///////
app.use ((req, res, next) => {
    const error = new Error(`not found ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use(errorHandler);

/*
app.get('/api/products', (req, res) => {
    console.log("entro a la funcion de la ruta /api/products ")
    const products = [
        { name: "product1", id:1},
        { name: "product2", id:2}
    ]

    res.json(products)

});

app.post('/api/products', (req, res) => {
    console.log(req.body)
    const {name} = req.body;

    res.json(name);
});
*/


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});