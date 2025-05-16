const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'Inscription réussie', user });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de l\'inscription' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

  res.json({ message: 'Connexion réussie', user });
};
