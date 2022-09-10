//const Post = require('../models/Post');
//const fs = require('fs');
//const app = require('../app');
//const auth = require('../middleware/auth');

const db = require("../database/db.mysql");

// pour AFFICHER LA LISTE DES POSTS
exports.postsList = (req, res, next) => { 
  const sqlRequest = "SELECT * FROM posts ORDER BY datetime DESC"
  db.query(sqlRequest, (err, result) => {
    if(err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result); //result c'est ce que nous renvoie la requête correspond à tous les posts. il faudra l'envoyer au front
    //en faisant une requête axios, console log le result et ça donnera le result
  });
};
  
// pour AFFICHER UN POST grace à son id
exports.findOnePost = (req, res, next) => { 
  const sqlRequest = "SELECT * FROM posts WHERE id ="  
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({ error }));
};
  
// pour CRÉER un post 
exports.createPost = (req, res, next) => { 
  console.log(req.body);
  let { body, file } = req;
  if(!file) delete req.body.image;
  body = {
    ...body, 
    likes:"",
  };

  const sqlInsert = "INSERT INTO posts SET ?"; //permet d'éviter les injections SQL.
  db.query(sqlInsert, body, (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json ({ err });
      throw err;
    }

    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = "INSERT INTO images (" // voir vidéo onpenchcicken 22:25 explication
      db.query(sqlInsertImage, (err, result) => {
        if(err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json({ message : "Post successfully added"})
      });
    }
  });
};

// pour MODIFIER un post sur la page-même du post (créateur du post seulement)
exports.modifyPost = (req, res, next) => { 
  const sauceObject = req.file ? { 
    ...JSON.parse(req.body.sauce), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }; 
  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id}) 
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) { 
        res.status(401).json({ message : 'Non autorisé' });
      } else {
        Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id}) 
        .then(() => res.status(200).json({ message : "Sauce modifiée" }))
        .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
}

// pour SUPPRIMER une sauce sur la page-même de la sauce (créateur de la sauce seulement)
exports.deletePost = (req, res, next) => { 
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
          .then(() => { res.status(200).json({ message : 'Objet supprimé' }) })
          .catch(error => res.status(401).json({ error}));
        }
        )}
    })
    .catch( error => {
      res.status(500).json({ error });
    });
}

//pour AJOUTER UN LIKE, un DISLIKE ou annuler son like/dislike
exports.likePost = (req, res, next) => { 
  const likedSauce = Sauce.findOne({ _id: req.params.id }) 
  .then(sauce => {
    if(req.body.like == 1) { // si l'user clique sur like
      if(sauce.usersLiked != req.body.userId) { 
      sauce.likes++; 
      sauce.usersLiked.push(req.body.userId); 
      sauce.save();
      res.status(200).json({ message: "Sauce likée !"})
      }
    }
    if(req.body.like == 0) { // si l'user annule son like ou son dislike
     if(sauce.usersLiked.includes(req.body.userId)) { //l'user souhaite annuler son like
      sauce.likes--;
      sauce.usersLiked.splice(req.body.userId);
      sauce.save();
      res.status(200).json({ message: "L'utilisateur annule son like" })
      }
      if(sauce.usersDisliked.includes(req.body.userId)) { // l'user souhaite annuler son dislike
        sauce.dislikes--;
        sauce.usersDisliked.splice(req.body.userId);
        sauce.save();
        res.status(200).json({ message: "L'utilisateur annule son dislike" })
      }
    }
    if(req.body.like == -1) { // si l'user clique sur dislike
      if(sauce.usersDisliked != req.body.userId) { 
      sauce.dislikes++;
      sauce.usersDisliked.push(req.body.userId);
      sauce.save();
      res.status(200).json({ message: "Sauce dislikée !"})
      } else { // si l'user a déjà disliké la sauce
        res.status(400).json({ message: "L'utilisateur n'aime déjà pas la sauce"})
      }
    }
  })
  .catch((error) => {
    res.status(500).json({ error });
  })
}
