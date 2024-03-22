// had to add transports, or the socket wouldnt work and nothing was sending

// un comment for codio
//const socket = io('https://strangeanimal-bakercave-5678.codio-box.uk/', { transports : ['websocket'] });
//const socket = io('http://159.65.214.76:5678', { transports : ['websocket'] });
//const socket = io('https://portfolio-website1-da4080e6c25f.herokuapp.com/', { transports : ['websocket'] });


const socket = io();
const message_form = document.getElementById('send_container')
const message_container = document.getElementById('message_container')
const message_input = document.getElementById('message_input_data')
const active_users_container = document.getElementById('active_users_list')
let num_of_messages = 0

const user_name = prompt('Enter your username: ')
socket.emit('new_user', user_name)
add_message_to_screen('You connected')


//when recieve chat message
socket.on('chat_message', data => {
    // if username = 'bob', message = 'hello
    // sends 'bob: hello'
   add_message_to_screen(`${data.user_name}: ${data.message}`)
})

//when new user joins chat message
socket.on('user_connected', user_name => {
    // using `` allows for f-strings like python
   add_message_to_screen(`${user_name} connected`)
   
})

socket.on('user_disconnected', user_name => {
    // using `` allows for f-strings like python
   add_message_to_screen(`${user_name} disconnected`)
   //remove_user_from_active_users(user_name)
})

socket.on('active_users', active_users_array => {

    active_users_container.innerHTML = '';

    //adds all active users to screen
    for (let i = 0; i < active_users_array.length; i++) {
        add_user_to_active_users(active_users_array[i])
    }
})


//run when submit button clicked
message_form.addEventListener('submit', e => {
    //stop submitting form
    e.preventDefault()
    const message = message_input.value
    
    //send the message data to server
    socket.emit('send_chat_message', message)
    //clear message box
    message_input.value = ''

    //add message to screen
    add_message_to_screen(`You: ${message}`)


})

// adds username to active users div
function add_user_to_active_users(username) {
    const Element = document.createElement('p')
    Element.innerText = username
    Element.id = username

    active_users_container.append(Element)
}

// adds removes username from active users div
function remove_user_from_active_users(username) {
    const elementToRemove = document.getElementById(username);
    if (elementToRemove) {
    active_users_container.removeChild(elementToRemove);
    }
}

// add message to html
function add_message_to_screen(message) {
    
    //adapted the code from sample code
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" , second: "numeric"});

    const Element = document.createElement('div')
    //add the message to div
    Element.innerText = message + `  (${formattedTime})`
    Element.id = `chat_num_${num_of_messages}`
    Element.className = 'chat_message_div'
    message_container.append(Element)
    num_of_messages += 1;
    auto_scroll();
   
}

// this function auto scrolls the page down
function auto_scroll() {
    const element = document.getElementById('message_container');
    element.scrollTop = element.scrollHeight;
}

const activeUsersDiv = document.getElementById('active_users_list');
const activeUsersToggle = document.getElementById('active_users_toggle');

// Toggle visibility of active users section when clicked
activeUsersToggle.addEventListener('click', () => {
    activeUsersDiv.classList.toggle('hidden');
});

if (window.innerWidth < 760) {
    activeUsersDiv.classList.toggle('hidden');
}