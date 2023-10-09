const jwt = require('jsonwebtoken');

function logged(req, res, next){
    const token = req.headers['x-access-token'];

    if(!token) return res.status(403).json({message: 'not token provided'})

    try{
        decode = jwt.verify(token, 'secret');
        
    } catch (error){
        return res.json(error)
    }

    next
}