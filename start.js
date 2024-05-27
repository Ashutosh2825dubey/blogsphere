const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const proroutes=require('./routes/blog routes');
//express app setup
const app=express();
//database connection mongodb
const dbURI='mongodb+srv://shaun:amandubey123@nodetuts.eswobdi.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)//connect to database asynchronous task it is returns a promise
.then((result)=>app.listen(3000))
.catch((err)=>{
    console.log('Failed to connect to Database');
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