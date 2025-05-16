const io = require('socket.io');

function createWebsocket(server){
    const socket = io(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    socket.on('connection', (soc) => {
        soc.on('message', function (msg) {
            socket.emit('message', msg);
        });
    })
}

module.exports = createWebsocket