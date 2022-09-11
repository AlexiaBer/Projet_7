//const cryptoJs = require("crypto-js");
const dotenv = require("dotenv");
const result = dotenv.config();
//const bcrypt = require("bcrypt");

class Post {
  constructor(title, content) {
    //modèle pour créer des objets en JS. opérateur NEW pour créer l'objet post.
    this.title = title;
    this.content = content;
    //this. = ;
    //this. = ;
    //this. = ;
  }
}
module.exports = Post;

/*
  //methode de chiffrage de l'email
  emailCrypting(){
  const cryptedEmail = cryptoJs
    .HmacSHA256(this.email, `${process.env.CRYPTOJS_CLE_EMAIL}`)
    .toString(); // je crypte l'e-mail de l'utilisateur avant de l'envoyer dans la BDD
  return cryptedEmail;
  }

  //methode pour hasher le mdp
  passwordHashing = async function() {
    try{
      const passwordHash = bcrypt.hash(this.password, 10)
      return passwordHash;
    }
    catch{err} {
      console.log(err)
    }
  } 
  */
