const jwt = require('jsonwebtoken');
const JWT_SECRET = 'maanasmahato';

const fetchuser = async (req, res, next) => {
    const token = await req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "invalid token!" });
    }
    const data = await jwt.verify(token, JWT_SECRET);
    if (!data) {
        return res.status(401).send({ error: "wrong token!" });
    }
    req.user = data.user
    next();
}

module.exports = { fetchuser };