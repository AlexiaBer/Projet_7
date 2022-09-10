const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TopSecret123!",
  database: "groupomania"
});

db.connect((err) => { 
  if (err) {
    console.log(`error connecting : ${err}`);
  } else {
     console.log("Connecté à la base de données MySQL!");
     console.log(`connected as id ${db.threadId}`)
  }
 
});

module.exports = db;
