const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const package = require('./package.json');

const port = process.env.PORT || 5500;
const apiRoot = "/api";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/localhost/
}));

const db = {
    alexia: {
        user: "alexia", 
        currency: "$",
        description: "perfect",
        balance:100,
        transactions: []
    }
}

//configurer routes
const router = express.Router();
router.get("/", (req, res) => {
    res.send(`${package.name} -v${package.version}`);
})

router.get("/accounts/:user", (req, res) => {
    const user = req.params.user;
    const account = db[user];

    if (!account) {
        return res
        .status(404)
        .json({ error: "user doesn't exist"});
    }
    return res.json(account);
})
router.post("/accounts", (req,res) => {
    //récupérer le body de l'objet request qui contient les données
    const body = req.body;
    //valider les valeurs requises
    if (!body.user || !body.currency) { //on vérifie qu'on a bien reçu un nom user et currency
        return res
        .status(400)
        .json({ error: "user and currency are required"});
    }
    //vérifier que le compte n'existe pas déjà
    if (db[body.user]) {
        return res
        .status(400)
        .json( { error: "Account already exists" });
    }
    //créer un compte
    const account = {
        user: body.user,
        currency:body.currency,
        description:body.description || `${body.user}'s account`,
        balance: body.balance || 0,
        transactions: []
    }
    db[account.user] = account;
    //quand on crée une ressource via une API on veut recevoir 
    //le nouvel objet créé pour récup nouvelles infos générées par le serveur
    return res
    .status(201)
    .json(account);
})

//enregistrer routes
app.use(apiRoot, router);

app.options("*", cors());
app.listen(port, () => {
    console.log('server works')
});