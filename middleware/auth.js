const jwt = require('jsonwebtoken');


function auth (req, res, next) {
    const token  = req.header('x-auth-token');

    // Check for token
    if(!token) {
        res.status(401).json({
            success: false,
            msg: 'Hyrja nuk lejohet'
        });
        return;
    }


    try {
        // Verify token
        jwt.verify(token, process.env.CRYPTO_SECRET, (err, user) => {
            if(err) {
                return res.status(403).json({
                    success: false,
                    msg: 'Token nuk eshte valid, hyrja nuk lejohet'
                });
            }
            next();
        });
    } catch (err) {
        const errors = err.errors ? Object.keys(err.errors) : [];
        res.status(403).json({
            success: false,
            msg: 'Token nuk eshte valid, hyrja nuk lejohet 2',
            errors: errors.map(e=> err.errors[e].message)
        });
    }
}

module.exports = auth;