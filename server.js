require('dotenv').config();
const app = require('./src/app');
const server = require('http').createServer(app);
require('./src/socket/websocket')(server);
const db = require('./src/database/connect');

const PORT = process.env.PORT


app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${"http://localhost:" + PORT}`);
});