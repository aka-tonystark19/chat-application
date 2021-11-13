const socket = io('http://localhost:8000');

//DOM variables in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//audio for message alert
var audio = new Audio('ping.mp3');
//function to append event info to the container
const append= (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
//prompt to ask their names and let the server know
const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);
//if a new user joins, recieve event from the server
socket.on('user-joined', name=>{
    append(`${name} joined the chat!`, 'right');
})
//if server sends a message, receive it
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})
//if a user leaves, append the info to the container
socket.on('left', name=>{
    append(`${name} left the chat.`, 'right');
})
//if the form gets submitted, send message to the server
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput = '';
})