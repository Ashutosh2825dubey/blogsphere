const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const proroutes=require('./routes/blog routes');
require('dotenv').config();
//express app setup
const app=express();
//database connection mongodb
const PORT = process.env.PORT ||3000 ;
const dbURI= process.env.mongodbURI;
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })//connect to database asynchronous task it is returns a promise
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(proroutes);
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});