const express = require('express');
const morgan = require('morgan');

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

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/chat', (req, res) => {
    res.render('chat', {title: 'Chat'})
})

// 404 page, only runs if none of the other functions run
app.use((req, res) => {
    res.status(404).render('404', {title: 'ERROR 404'})
});