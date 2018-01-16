var jwt = require('jsonwebtoken');

module.exports.post = function(req, res){
    const user = { id : 3 };
    const token = jwt.sign({ user }, process.env.SECRET_KEY);
    // process.env.TOKEN_KEY = token;
    res.json({
        token : token
    });
};

module.exports.validation = function(req, res, next){
    const auth = req.headers['token'];
    if(typeof auth !== 'undefined'){
        jwt.verify(process.env.TOKEN_KEY, process.env.SECRET_KEY, function(err, data){
            if(err){
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(404);
    }
};