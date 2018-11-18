let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let socketlist=[]
io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');
    socketlist.push(socket)

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
        var index = socketlist.indexOf(5);
        if (index > -1) {
            socketlist.splice(index, 1);
        }
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        socketlist.forEach(function(cur){
            cur.emit('message', message);
        });
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});