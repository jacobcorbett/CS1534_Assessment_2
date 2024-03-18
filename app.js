const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Chat = require('./models/chat')

//express app
const app = express();

//connect to database
// if connection successful run app on port 3000
const dbURI = 'mongodb+srv://mightymander:tNiaZ3th0YjzJuW4@chatdb.blkcylv.mongodb.net/?retryWrites=true&w=majority&appName=chatDB';
console.log('Attempting Connection to db...')
mongoose.connect(dbURI)
    .then((result) => console.log('Successfully connected to database'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// // temp for adding data to database
// const test = new Chat({
//   user: 'mark',
//   body: 'test chat 2'
// })
// test.save()  

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
    
    Chat.find()
    .then((result) => {
        res.render('chat' , {title: 'All Blogs', chats: result})
    })
    .catch((err) => {
        console.log(err);
    })
    
})

// 404 page, only runs if none of the other functions run
app.use((req, res) => {
    res.status(404).render('404', {title: 'ERROR 404'})
});