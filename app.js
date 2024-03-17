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
    res.render('index')
})
