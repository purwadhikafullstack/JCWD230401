const jwt = require('jsonwebtoken');

module.exports = {
    createToken: (payload, exp='24h') => jwt.sign(payload, 'TEMPATKU', {
        expiresIn: exp
    }),
    readToken: (req, res, next) => {
        console.log("ini dari helper readToken req.token:", req.token);
        jwt.verify(req.token, 'TEMPATKU', (error, decrypt) => {
            if(error){ 
                console.log(error);
                return res.status(401).send({
                    success: false,
                    message: 'AUTHENTICATION FAILED ❌'
                })
            }
            req.decrypt = decrypt; 
            next(); 
        })
    },
    createTokenForKTP: (payload) => jwt.sign(payload, 'TEMPATKU'),
}