const socketservermaker = require("socket.io");
const express = require('express')
const path = require('path');
const app = express();
const webservermaker = require('http')
const server = webservermaker.createServer(app);
const io = socketservermaker(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(25565, () => {
});
io.on('connection', (socket) => {
    console.log('connected')

    socket.on('newmessage', (data) => {
        console.log(data)
        socket.broadcast.emit('reciever', data)
    });
    socket.on('userjoined', (data) => {
        console.log(data)
    })
});