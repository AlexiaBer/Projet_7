const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const db = require("../database/db.mysql");

const dotenv = require("dotenv");
const result = dotenv.config();

const app = require('../app');

const bodyParser = require('body-parser');

// pour CRÉER UN COMPTE
exports.signUp = async (req, res) => { 

  //req.setHeader('Content-Type', 'application/json');
  const { firstname, lastname, email, password } = req.body;

  console.log("Est-ce que j'atteins bien ma fonction dans le controller ??");
  console.log("POURQUOI req.body EST VIDE ? ->" + req.body);

  const cryptedEmail = cryptoJs
    .HmacSHA256(email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
    .toString(); // je crypte l'e-mail de l'utilisateur avant de l'envoyer dans la BDD

  bcrypt.hash(password, 10) // je crypte son mdp également dans la BDD
  .then((hash) => {
    console.log("CryptedEmail et hash" + cryptedEmail + hash);
    const newUser = {
      email: cryptedEmail,
      password: hash
    }

  })
  .catch((error) => res.status(500).json({ error }).send(console.log(error)))


}
/*
AJOUTER UN USER :

INSERT INTO users (`lastname`,`firstname`,`email`,`password`,`image`,`birthdate`,`role`) VALUES ('Modé', 'rateur', 'moderateur@gmail.com', 'test12345', '', '1992-12-12', '1');


  const body = { firstname, lastname, email, password };
  const addUser = "INSERT INTO users SET ?";
  db.query((addUser, body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }
  res.status(200).json({ message : "Nouvel utilisateur créé !"})
  }))
}
  try {
    .then(hash => {
      console.log(hash + " hash");
      console.log(cryptedEmail + " cryptedEmail")
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: cryptedEmail,
        password: hash,
     }
    }


  
  catch(error) {
    res.status(200).send({ error })
  }
  


      //requête SQL
      db.query(
      'INSERT INTO users SET ?', user, (error, results, fields)=> {
        if(error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(" --> results");
          console.log(results);
          res.json({ message : "Utilisateur enregistré"});
        }
      })
    })
    .catch(error => res.status(500).json({ error }));
}
*/
// pour SE CONNECTER à son compte
module.exports.login = (req, res) => { 
  const cryptedEmail = cryptoJs.HmacSHA256(req.body.email, "?cle1de2securite3!").toString();
  mysql.query( //il faut chercher si l'user existe dans la BDD
    'SELECT cryptedEmail FROM users', (error, results, fields)=> {
      if(error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log(" --> results");
        console.log(results);
        res.json({ message : "Utilisateur trouvé"});
      }
    })
  
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

//POUR MODIFIER SON COMPTE

module.exports.modifyUser = (req, res) => { 
  const cryptedEmail = cryptoJs.HmacSHA256(req.body.email, "?cle1de2securite3!").toString();
  mysql.query( //il faut chercher si l'user existe dans la BDD
    'SELECT cryptedEmail FROM users', (error, results, fields)=> {
      if(error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log(" --> results");
        console.log(results);
        res.json({ message : "Utilisateur trouvé"});
      }
    })
  


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


// pour SUPPRIMER son compte
exports.deleteUser = (req, res) => { 
  const cryptedEmail = cryptoJs.HmacSHA256(req.body.email, "?cle1de2securite3!").toString();
  mysql.query( //il faut chercher si l'user existe dans la BDD
    'SELECT cryptedEmail FROM users', (error, results, fields)=> {
      if(error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log(" --> results");
        console.log(results);
        res.json({ message : "Utilisateur trouvé"});
      }
    })
  


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
