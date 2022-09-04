const bcrypt = require('bcrypt');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const db = require("../database/db.mysql");

const dotenv = require("dotenv");
const result = dotenv.config();

const app = require('../app');

const bodyParser = require('body-parser');

//pour OBTENIR LA LISTE DES UTILISATEURS

// pour CRÉER UN COMPTE
exports.signUp = async (req, res) => { 

  //req.setHeader('Content-Type', 'application/json');
  const { firstname, lastname, email, password } = req.body;

  console.log("Est-ce que j'atteins bien ma fonction dans le controller ??");
  console.log("POURQUOI req.body EST VIDE ? ->" + req.body.password);

  const cryptedEmail = cryptoJs
    .HmacSHA256(email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
    .toString(); // je crypte l'e-mail de l'utilisateur avant de l'envoyer dans la BDD

  bcrypt.hash(password, 10) // je crypte son mdp également dans la BDD
  .then((hash) => {
    console.log("CryptedEmail et hash" + cryptedEmail + hash);
    const newUser = {
      firstname,
      lastname,
      email: cryptedEmail,
      password: hash,
      role:2
    }
  db.query(
    'INSERT INTO users SET ?', newUser, (error, results, fields) => {
      if(error){
        console.log(error);
        res.status(400).json({ error });
      } else {
        console.log("results" + results);
        res.status(201).json( { message : "utilisateur créé"});
      }
    }
  )
  })
  .catch((error) => res.status(500).json({ error }).send(console.log(error)))

}

// pour SE CONNECTER à son compte
module.exports.login = (req, res) => { 
  const cryptedEmail = cryptoJs
  .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
  .toString();
  const email = cryptedEmail;
  db.query( //il faut chercher si l'user existe dans la BDD
    'SELECT * FROM users WHERE email = ?', email, (error, results) => {
      if(error) {
        console.log(error);
        res.json({ error });
      } else {
          if(results == null || 0 ) { //si l'email n'est pas dans la bdd
            return res.status(404).json({ error : "Paire identifiant/mot de passe incorrecte"})
           } 
        const user = results[0]
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
}
 /* 


*/
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
