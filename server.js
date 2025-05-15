require('dotenv').config();
const app = require('./src/app');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db.config');
const User = require('./src/models/user.model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync()
    .then(() => console.log('✅ Connecté à la base et tables créées'))
    .catch(err => console.error('❌ Erreur de connexion:', err));

app.use('/api/auth', require('./src/routes/route.api'));
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${"http://localhost:"+PORT}`);
});
