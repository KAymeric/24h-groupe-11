const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middlewares/auth.middleware');
router.use(verifyApiKey); 

router.get('/', (req, res) => {
  res.json({ message: 'Accés autorisé avec une clé API valide' });
});

module.exports = router;
