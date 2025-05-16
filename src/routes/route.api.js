const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middlewares/auth.middleware');
const { signup, login } = require('../controllers/auth.controller');
router.use(verifyApiKey);

router.get('/', (req, res) => {
  res.json({ message: 'Accés autorisé avec une clé API valide' });
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
