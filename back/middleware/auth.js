const jwt = require('jsonwebtoken');

// pour AUTHENTIFIER l'utilisateur via son token.
module.exports = (req, res, next) => { 
    try { 
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, 'test782voilacommecaonverra903'); 
        const userId = decodedToken.userId; 
        req.auth = {        
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};