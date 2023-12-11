const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const userController = require('../controllers/userController'); // Import the userController

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'apirest'
});

connexion.connect((err) => {
    if (err) {
        console.log("Erreur de Connexion : " + err.stack);
        return;
    }
    console.log("Connexion reussi à la Bdd!");
});

router.get("/", (req, res) => {
    connexion.query("Select * FROM Users ", (err, rows, fileds) => {
        if (err) throw err;
        res.json(rows);
    })
})

router.get("/:id", (req, res) => {
    const userID = req.params.id;
    connexion.query("Select * FROM Users where id = ?", [userID], (err, rows, fileds) => {
        if (err) throw err;
        res.json(rows);
    })
})

router.post("/", userController.addUserController);
router.put("/:user_id", userController.updateUser);
router.delete("/:user_id", userController.deleteUserController); // Use userController.deleteUser for deleting a user

module.exports = router;
