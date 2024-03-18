// had to add transports, or the socket wouldnt work and nothing was sending

// un comment for codio
//const socket = io('https://strangeanimal-bakercave-5678.codio-box.uk/', { transports : ['websocket'] });

const socket = io('http://localhost:5678', { transports : ['websocket'] });
const message_form = document.getElementById('send_container')
const message_input = document.getElementById('message_input_data')
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
    message_form.append(Element)
    num_of_messages += 1;
}