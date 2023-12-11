// auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/connection');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query("SELECT * FROM users WHERE email = ? AND motDePasse = ?", [email, password], (err, results) => {
        if (err) {
            console.error("Erreur lors de la vérification des informations d'identification : " + err.message);
            return res.status(500).json({ error: "Erreur lors de la vérification des informations d'identification" });
        }

        if (results.length > 0) {
            const user = { email: results[0].email, role: results[0].role_id };
            const accessToken = jwt.sign(user, 'votre_clé_secrète');
            res.json({ accessToken });
        } else {
            res.status(401).json({ error: "Informations d'identification invalides" });
        }
    });
});

module.exports = router;
