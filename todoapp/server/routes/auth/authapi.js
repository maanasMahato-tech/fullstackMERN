const express = require('express');
const { Auth } = require('../../model/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'maanasmahato';
const { fetchuser } = require('../../fetchuser/fetchuser');

const router = express.Router();


router.post('/adduser', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(404).send({ error: "credentials not filled!" });
    }

    try {
        const userExist = await Auth.findOne({ email: email });
        if (userExist) {
            return res.status(401).send({ message: "user exist!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const data = new Auth({
            name: name,
            email: email,
            password: hashPass
        })
        await data.save();
        success = true;
        res.status(201).send({ success, data })

    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send({ error: "credentials not filled!" });
    }

    try {
        let user = await Auth.findOne({ email: email });
        if (!user) {
            success = false
            return res.status(401).send({ success, error: "user doesn't exist!" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false
            return res.status(401).send({ success, error: "wrong password!" });
        }

        let data = {
            user: {
                id: user.id
            }
        }

        const authtoken = await jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(201).send({ success, authtoken })


    } catch (error) {
        console.log(error)
    }

})

router.get('/getusers', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const userData = await Auth.findById(userID).select("-password");
        success = true;
        res.status(201).json({ success, userData });
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    routes: router
}