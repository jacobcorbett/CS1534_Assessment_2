// had to add transports, or the socket wouldnt work and nothing was sending

// un comment for codio
//const socket = io('https://strangeanimal-bakercave-5678.codio-box.uk/', { transports : ['websocket'] });
//const socket = io('http://159.65.214.76:5678', { transports : ['websocket'] });


const socket = io('http://localhost:5678', { transports : ['websocket'] });
const message_form = document.getElementById('send_container')
const message_container = document.getElementById('message_container')
const message_input = document.getElementById('message_input_data')
const active_users_container = document.getElementById('active_users_div')
let num_of_messages = 0

const user_name = prompt('Enter your username: ')
socket.emit('new_user', user_name)
add_message_to_screen('You connected')
add_user_to_active_users(`${user_name} (YOU)`)

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
   add_user_to_active_users(user_name)
})

socket.on('user_disconnected', user_name => {
    // using `` allows for f-strings like python
   add_message_to_screen(`${user_name} disconnected`)
   remove_user_from_active_users(user_name)
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
    const Element = document.createElement('div')
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