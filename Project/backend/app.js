const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


//@desc use express-json
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads',express.static('uploads'));

//@desc moved database conecttion to config folder
require('./config/db');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        Response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//@desc define routes
// app.use('/api/orders', orderRoutes);
app.use('/api/auth',authRoutes );
app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//@desc:listening to port 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
                                         
