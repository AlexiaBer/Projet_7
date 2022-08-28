const express = require('express'); 
const bodyParser = require('body-parser');

const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
app.use(express.json());

app.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
});

app.use(bodyParser.json());

//app.use('/api/auth', userRoutes); //la base de l'url pour toutes les routes concernant les users
app.use('/api/posts', postRoutes); //la base de l'url pour toutes les routes concernant les posts

//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; 