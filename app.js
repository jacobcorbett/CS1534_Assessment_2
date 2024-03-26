const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Chat = require('./models/chat')
const User = require('./models/user')
//const io = require('socket.io')
//const io = require('socket.io') //starts socket on port 5678

const users = {}
let active_user_list = []
let typing_user_list = []

//express app
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//connect to database
// if connection successful run app on port 3000
const dbURI = 'mongodb+srv://mightymander:tNiaZ3th0YjzJuW4@chatdb.blkcylv.mongodb.net/development_database?retryWrites=true&w=majority&appName=chatDB';
console.log('Attempting Connection to db...')
mongoose.connect(dbURI)
    .then((result) => console.log('Successfully connected to database'))
    .catch((err) => console.log(err));

//start main website on port 80
const port = process.env.PORT || 80
server.listen(port)

function add_user_name_to_database(user_name) {
const new_user_test = new User({
             user_name: user_name,
            })
            new_user_test.save() 
            // currently crashes if username = null 
            .catch((err) => {
                console.log(err)
            })
}

function add_message_to_database(username, message) {
    const new_message_to_add = new Chat ({
        user: username,
        body: message
    })
    new_message_to_add.save()
    // currently crashes if you send empty string
    .catch((err) => {
                console.log(err)
            })
}



// register view engine
app.set('view engine', 'ejs');
app.set('views', 'views')


//added public static files
app.use(express.static('public'))

// 3rd party module for logging
app.use(morgan('dev'));


//testing socket
io.on('connection', socket => {
   

    //when socket recives 'new_user'
    socket.on('new_user', user_name =>{
        console.log('new user:', user_name)

        // save username to database
        add_user_name_to_database(user_name)

        //add username to array
        users[socket.id] = user_name
        socket.broadcast.emit('user_connected', user_name);
        
        active_user_list.push(user_name);
        io.emit('active_users', active_user_list)
        console.log(active_user_list)
        
    })

    //when socket recives 'send_chat_message', then emit that message to everyone other than the one who sent it
    socket.on('send_chat_message', message => {
        socket.broadcast.emit('chat_message', {message: message, user_name: users[socket.id]});
        
        //save message to databaase
        add_message_to_database(users[socket.id], message)
        
    })

    //when socket recives 'disconnect'
    socket.on('disconnect', () => {
        
        console.log('user disconnected:', users[socket.id]);
        socket.broadcast.emit('user_disconnected', users[socket.id]);
        
        //removes user from array
        const index = active_user_list.indexOf(users[socket.id]);
        active_user_list.splice(index, 1)
        io.emit('active_users', active_user_list)
        console.log(active_user_list)

        // remove user from array when user leaves
        delete users[socket.io];
    })

    socket.on('not_typing', user_name => {
        if (typing_user_list.includes(user_name)) {
            const index = typing_user_list.indexOf(user_name);
            typing_user_list.splice(index, 1)
        }
        
    })

    socket.on('typing', user_name => {
        console.log(`typing: ${user_name}`)
        if (!typing_user_list.includes(user_name)) {
             typing_user_list.push(user_name);
        }
    })


})

//function for checking if user typing, every 1s
setInterval(check_typing,1000);
function check_typing() {
    io.emit('typing_users', typing_user_list)
}

// if user attempts to go to root page, render index page
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
})

// if user attempts to go to portfolio page, render portfolio page
app.get('/projects', (req, res) => {
    res.render('projects', {title: 'Projects'})
})

// if user going to portfolio/something go to it
// not used but in case want to use later for more info on projects
app.get('/projects/:id', (req, res) => {
    const id = req.params.id;

    //if page doesnt excsit send to 404 page
    res.render(`projects/${id}`, {title: 'scalloway website'}, (err, html) =>{
        if (err) {
            res.status(404).render('404', {title: 'ERROR 404'})
            return;
        }
        res.send(html)
    })
})



// if user attempts to go to about page, render about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// if user attempts to go to chat page, render chat page
app.get('/chat', (req, res) => {
    res.render('chat', {title: 'chat'})
})

// 404 page, only runs if none of the other functions run
app.use((req, res) => {
    res.status(404).render('404', {title: 'ERROR 404'})
});