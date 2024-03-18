const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

//express app
const app = express();

app.listen(3000)

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'views')


//added public static files
app.use(express.static('public'))

// 3rd party module for logging
app.use(morgan('dev'));


// if user attempts to go to root page, render index page
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})

// if user attempts to go to about page, render about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// if user attempts to go to chat page, render chat page
app.get('/chat', (req, res) => {
    res.render('chat', {title: 'Chat'})
})

// 404 page, only runs if none of the other functions run
app.use((req, res) => {
    res.status(404).render('404', {title: 'ERROR 404'})
});