require('dotenv').config();
const app = require('./src/app');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);

// Configuration des websockets
require('./src/socket/websocket')(server);

// Configuration de la base de données
const sequelize = require('./src/config/db.config');
const User = require('./src/models/user.model');

// Middleware pour parser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Synchronisation de la base de données Sequelize
sequelize.sync()
    .then(() => console.log('✅ Connecté à la base et tables créées'))
    .catch(err => console.error('❌ Erreur de connexion:', err));

// Route pour la page d'accueil
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

// Routes API
app.use('/api/auth', require('./src/routes/route.api'));

// Configuration du port
const PORT = process.env.PORT;

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${"http://localhost:" + PORT}`);
});