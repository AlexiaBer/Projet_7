const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../database/db.mysql");

const dotenv = require("dotenv");
const result = dotenv.config();

const app = require("../app");

const bodyParser = require("body-parser");

//pour OBTENIR LA LISTE DES UTILISATEURS

// pour CRÉER UN COMPTE
exports.signup = async (req, res) => {
  //req.setHeader('Content-Type', 'application/json');
  const { firstname, lastname, email, password } = req.body;
  const newUser = new User(firstname, lastname, email, password);
  const cryptedEmail = newUser.emailCrypting();

  newUser
  .passwordHashing()
  .then((hash) => {
   console.log("hash" + hash) 

   const data = {
    firstname, 
    lastname, 
    email: cryptedEmail, 
    password: hash
   }

   console.log(data);

   db.query("INSERT INTO users SET ?", data, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error });
    } else {
      console.log("results" + results);
      res.status(201).json({ message: "utilisateur créé" });
    }
  });
  })
  .catch((err) => res.status(500).json({ err }).send(console.log(err)));


  //const cryptedEmail = cryptoJs
  //  .HmacSHA256(email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
  //  .toString(); // je crypte l'e-mail de l'utilisateur avant de l'envoyer dans la BDD

}
/*
  bcrypt
    .hash(password, 10) // je crypte son mdp également dans la BDD
    .then((hash) => {
      console.log("CryptedEmail et hash" + cryptedEmail + hash);

      {
        firstname, 
        lastname, 
        email : cryptedEmail,
        password : hash,
        role:2
      }
  */ 
 /*
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};
*/
// pour SE CONNECTER à son compte
module.exports.login = async (req, res) => {

  const { email, password } = req.body;
  const cryptedEmail = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
    .toString();
  db.query(
    //il faut chercher si l'user existe dans la BDD
    "SELECT * FROM users WHERE email = ?",
    cryptedEmail,
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        const user = results[0];
        //si l'email n'est pas dans la bdd
        if (user == null || 0) { 
          return res
            .status(404)
            .json({ error: "Paire identifiant/mot de passe incorrecte" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              // le mdp transmis n'est pas correct
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              // le mdp est correct, la fonction retourne l'userId et le token
              res.status(201).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  `${process.env.JWT_KEY_TOKEN}`,
                  { expiresIn: "4h" }
                )
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    }
  );
};
/* 


*/
//POUR MODIFIER SON COMPTE

module.exports.modifyUser = (req, res) => {
  const cryptedEmail = cryptoJs
    .HmacSHA256(req.body.email, "?cle1de2securite3!")
    .toString();
  mysql
    .query(
      //il faut chercher si l'user existe dans la BDD
      "SELECT cryptedEmail FROM users",
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(" --> results");
          console.log(results);
          res.json({ message: "Utilisateur trouvé" });
        }
      }
    )

    .then((user) => {
      if (user == null) {
        // l'user n'existe pas dans la BDD
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        //l'email existe dans la BDD
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              // le mdp transmis n'est pas correct
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              // le mdp est correct, la fonction retourne l'userId et le token
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  "test782voilacommecaonverra903",
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// pour SUPPRIMER son compte
