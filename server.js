require('dotenv').config();
const app = require('./src/app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('./src/database/connect');

const PORT = process.env.PORT || 5180;


app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${"http://localhost:" + PORT}`);
});