
import express from 'express';
import Product from '../models/products.js';
import mongoose from 'mongoose';

const router = express.Router()


/*
router.get('/', (req, res) => {
    console.log("entro a la funcion de la ruta /api/products ")
    const products = [
        { name: "product1", id:1},
        { name: "product2", id:2}
    ]

    res.status(400);
    ////////pasa el error al middleware
    throw new Error("this is an error");

    res.json(products);

});

router.post('/', (req, res) => {
    console.log(req.body)
    const {name} = req.body;

    res.json(name);
});
*/

router.get('/', async (req, res, next) => {
    console.log("entro a la funcion get de la ruta /api/products ")
    try {

        const products = await Product.find();
        res.json(products);
        
    } catch (error) {
        console.log(error);
        next(error)
    }

});


router.get('/:id', async (req, res, next) => {
    console.log("entro a la funcion get de la ruta /api/products/:id ")
    try {
        const {id} = req.params

        if (!mongoose.isValidObjectId(id)){
            res.status(404);
            ////////pasa el error al middleware
            throw new Error("Product not Found");
        }

        const product = await Product.findById(id);
        if (product){
            res.json(product);
        }
        else{
            res.status(404);
            ////////pasa el error al middleware
            throw new Error("Product not Found");
        }
        
    } catch (error) {
        console.log(error);
        next(error)
    }

});


router.post('/', async (req, res, next) => {
    console.log("entro a la funcion post de la ruta /api/products ")
    try {

        const {name, description, quantity, image} = req.body;

        if (!name?.trim()||!description?.trim()||!quantity?.trim()){
            res.status(400)
            throw new Error("name, description and quantity are required");
            
        }
        
        const newProduct = new Product({
            name,
            description,
            quantity,
            image
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        
    } catch (error) {
        console.log(error);
        next(error)
    }

});

export default router;