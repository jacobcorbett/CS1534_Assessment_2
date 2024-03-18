const socket = io('http://localhost:5000', { transports : ['websocket'] });
const message_form = document.getElementById('send-container')
const message_input = document.getElementById('message-input-data')

const user_name = prompt('Enter your username: ')
socket.emit('new_user', user_name)
add_message_to_screen('You connected')

//when recieve chat message
socket.on('chat_message', data => {
    // if username = 'bob', message = 'hello
    // sends 'bob: hello'

    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" , second: "numeric"});

   add_message_to_screen(`${data.user_name}: ${data.message}  (${formattedTime})`)
})

//when new user joins chat message
socket.on('user_connected', user_name => {
    // using `` allows for f-strings like python
   add_message_to_screen(`${user_name} connected`)
})

socket.on('user_disconnected', user_name => {
    // using `` allows for f-strings like python
   add_message_to_screen(`${user_name} disconnected`)
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
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" , second: "numeric"});

    add_message_to_screen(`You: ${message}  (${formattedTime})`)


})


// add message to html
function add_message_to_screen(message) {
    const Element = document.createElement('div')
    //add the message to div
    Element.innerText = message
    message_form.append(Element)
}