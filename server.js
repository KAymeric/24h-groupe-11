require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5180;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${"http://localhost:" + PORT}`);
});
