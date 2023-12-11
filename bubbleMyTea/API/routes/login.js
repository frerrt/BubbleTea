// login.js
const express = require('express');
const router = express.Router();

const login = (req, res) => {
    console.log('Login middleware is being called.');
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    } else {
        res.json({ message: 'Login successful' });
    }
};

router.post("/login", login);

module.exports = router;
