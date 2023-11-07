const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');

const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const orderRouter = require('./routers/orders')

// const api = process.env.API_URL;

//middleware
app.use(express.json());
app.use(morgan('tiny'));


//Routers
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/orders', orderRouter)



//Connection Base Data
mongoose.connect('conección base de datos')
.then(() => {
    console.log('La conexión a la base de datos está lista...');
})
.catch((err) => {
    console.log(err);
});


app.listen(3005, ()=>{
    console.log('Server ir running http://localhost:3000')
})