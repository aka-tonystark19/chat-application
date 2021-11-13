// Node server which will handle socet io connections
const io = require('socket.io')(8000)
const users = {}

io.on('connection', socket =>{
    //if new user joins, let the present users know
    socket.on('new-user-joined', name =>{
        // console.log(name, " joined the chat!");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        //if someone sends a message, broadcast it to others
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
    
    socket.on('disconnect', message=>{
        //if someone leaves the chat, let others know
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});