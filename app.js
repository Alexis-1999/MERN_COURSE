const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

// const api = process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    // countInStock: Number
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

mongoose.connect('conección base de datos mongoDB')
.then(() => {
    console.log('La conexión a la base de datos está lista...');
})
.catch((err) => {
    console.log(err);
});

app.get(`/products`, async(req, res)=>{
    const productList = await Product.find();

    if(!productList) res.status(500).json({success: false})
    res.send(productList)
})

app.post(`/products`,(req, res)=>{
    const product = new Product({
        name: req.body.name,
        image:req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            erro: err,
            success: false
        })
    })   
})
app.listen(3005, ()=>{
    console.log('Server ir running http://localhost:3000')
})