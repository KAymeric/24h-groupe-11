require('dotenv').config();

const API_KEY = (req, res, next) => {
  const userKey = req.headers['x-api-key'];

  if (!userKey) {
    return res.status(401).json({ error: 'API key manquante' });
  }

  if (userKey !== process.env.API_SECRET) {
    return res.status(403).json({ error: 'Clé API invalide' });
  }

  next();
};

module.exports = API_KEY;
