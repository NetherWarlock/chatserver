const socketio = require("socket.io-client")
const readline = require('readline');


let username1 = ""

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//////////////////////////////////////////////////////
//functions

const setUsername = () => {
  rl.question('Input {address:port} here:', (answer) => {
    let socket = socketio(`http://${answer}`);
    socket.on('reciever', function (a) {
      console.log(a)
    })

      rl.question('Input Username:', (answer) => {
        username1 = answer
        socket.emit('userjoined', `${username1} has joined the channel`, (data) => {
          console.log("lol")

        })
        messagesend(socket)
        console.log("cool")
      });
  
    })
    
}


function messagesend(socket) {
  rl.question('', (answer) => {
    socket.emit('newmessage', `${username1}: ${answer}`, (data) => {
    });    
    messagesend(socket)
  });

}
////////////////////////////////////////////////////////
//entrypoint
setUsername()