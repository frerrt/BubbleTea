// admin.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/connection');

// Middleware pour vérifier le token JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
    }

    jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6YXJAYWZyaWQuY29tICIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTA5MjM1OH0.fjuDdJspxmaEZ987Uu4twbJ1MN7lMAt3UEomPgsXH9g', (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Erreur lors de la vérification du token.' });
        }

        req.user = user;
        next();
    });
}

// Route protégée par le middleware de vérification du token
router.get("/", verifyToken, (req, res) => {
    // Vérifier le rôle de l'utilisateur (admin)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Accès interdit. Vous devez être administrateur pour accéder à cette ressource." });
    }

    // Utiliser le pool pour exécuter des requêtes SQL
    connection.query("SELECT nom FROM roles where nom = 'admin'", (err, results) => {
        if (err) {
            console.error("Erreur lors de l'exécution de la requête : " + err.message);
            return res.status(500).json({ error: "Erreur lors de l'exécution de la requête SQL" });
        }

        if (results.length > 0) {
            const nomAdmin = results[0].nom;
            console.log("La valeur de nomAdmin est :", nomAdmin);
            res.status(200).json({ nomAdmin: nomAdmin });
        } else {
            res.status(404).json({ message: "Aucun enregistrement trouvé pour 'admin'" });
        }
    });
});

module.exports = router;
