const io = require('socket.io');

function createWebsocket(server){
    const socket = io(server)

    socket.on('connection', (soc) => {
        console.log('user connected');
        soc.on('disconnect', function () {
            console.log('user disconnected');
        });
    })
}

module.exports = createWebsocket