const userModel = require('../models/UserModels');


function getAllUsers(req, res) {
    userModel.getAllUsers((users) => {
        res.json(users);
    });
}

function getUserById(req, res) {
    const userId = req.params.id;
    userModel.getUserById(userId, (user) => {
        res.json(user);
    });
}

async function addUserController(req, res) {
    try {
        const { username, roles, motdepasse, email } = req.body;
        const userId = await userModel.addUserController(username, roles, motdepasse, email);
        res.status(201).json({ message: "User ajouté avec succès.", userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout du User." });
    }
}

async function updateUser(req, res, next) {
    try {
        const { userId } = req.params;
        const { username, roles, motdepasse, email } = req.body;
        const updated = await userModel.updateUser(userId, username, roles, motdepasse, email);

        if (updated) {
            res.status(200).json({ message: "User mis à jour avec succès." });
        } else {
            res.status(404).json({ message: "User non trouvé." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la modification du User." });
    }
}
async function deleteUserController(req, res) {
    try {
        const { userId } = req.params;
        // console.log("Produit ID de la fonction deleteProductController:", produit_id);
        const deleteResult = await userModel.deleteUserController(userId);
        //  console.log("Delete Result:", deleteResult);
        if (deleteResult) {
            res.status(200).json({ message: "User supprimé avec succès." });
        } else {
            res.status(404).json({ message: "User non trouvé." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du User." });
    }
}

module.exports = {
    addUserController,
    updateUser,
    deleteUserController
};