const privateKey = "private-key" ; 
const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1] ; 

    try {
        const decoded = jwt.verify(token, privateKey); 
        if(decoded){
            next(); 
        }
    } catch (err){
        res.send(401).json({message: "Invalid token"}); 
        return 
    } 
}

module.exports = { adminMiddleware };