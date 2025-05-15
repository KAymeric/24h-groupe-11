require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${"http://localhost:" + PORT}`);
});
