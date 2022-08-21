const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mysql = require('mysql2');

const app = require('../app');

const bodyParser = require('body-parser');

// pour CRÉER UN COMPTE
exports.signUp = (req, res, next) => { 
    const cryptedEmail = cryptoJs.HmacSHA256(req.body.email, "?cle1de2securite3!").toString(); // je crypte l'e-mail de l'utilisateur avant de l'envoyer dans la BDD
    bcrypt.hash(req.body.password, 10) // je crypte son mdp également dans la BDD
    .then(hash => {
      console.log(hash + " hash");
      console.log(cryptedEmail + " cryptedEmail")
    })

    .catch(error => res.status(500).json({ error }));
}

// pour SE CONNECTER à son compte
exports.signIn = (req, res, next) => { 
  const cryptedEmail = cryptoJs.HmacSHA256(req.body.email, "?cle1de2securite3!").toString();
  User.findOne({ email: cryptedEmail })
  .then(user => {
    if (user == null) { // l'user n'existe pas dans la BDD
      res.status(401).json({ message : "Paire identifiant/mot de passe incorrecte" });
    } else { //l'email existe dans la BDD
      bcrypt.compare(req.body.password, user.password) 
      .then(valid => {
        if (!valid) { // le mdp transmis n'est pas correct
          res.status(401).json({message: "Paire identifiant/mot de passe incorrecte"})
          } else { // le mdp est correct, la fonction retourne l'userId et le token
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( 
                { userId: user._id }, 
                'test782voilacommecaonverra903', 
                { expiresIn: '24h' }
              )
            });
          }
        })
      .catch(error => {
        res.status(500).json({ error });
      })
    }
  })
  .catch(error => { res.status(500).json({ error })})
}