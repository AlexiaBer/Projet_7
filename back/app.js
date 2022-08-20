/* const mysql = require('mysql');

const db = mysql.createConnection({

    host: "localhost",
 
    user: "root@localhost",
 
    password: "Venusette27!"
 
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });

  */

const express = require('express'); 
const bodyParser = require('body-parser');

const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; 