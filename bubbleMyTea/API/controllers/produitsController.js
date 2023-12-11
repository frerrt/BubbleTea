const produitsModel = require("../models/ProduitsModel");

function getProductById(req, res) {
    const { ProductId } = req.params;
    produitsModel.getProductById(ProductId, (produit) => {
        res.json(produit);
    });
}

async function addProductController(req, res) {
    try {
        const { nom_produit, descriptions, prix, quantite_stock } = req.body;
        const productId = await produitsModel.addProduct(nom_produit, descriptions, prix, quantite_stock);
        res.status(201).json({ message: "Produit ajouté avec succès.", productId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'ajout du produit." });
    }
}

async function updateProductController(req, res) {
    try {
        const { produit_id } = req.params;
        console.log("Product ID in updateProductController:", produit_id);
        const { nom_produit, descriptions, prix } = req.body;
        console.log("Before updateProduct. Product ID:", produit_id);
        const updated = await produitsModel.updateProduct(produit_id, nom_produit, descriptions, prix);
        console.log("After updateProduct. Updated:", updated);
        if (updated) {
            res.status(200).json({ message: "Produit mis à jour avec succès." });
        } else {
            res.status(404).json({ message: "Produit non trouvé." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la modification du produit." });
    }
}

async function deleteProductController(req, res) {
    try {
        const { produit_id } = req.params;
        const deleteResult = await produitsModel.deleteProductController(produit_id);

        if (deleteResult) {
            res.status(200).json({ message: "Produit supprimé avec succès." });
        } else {
            res.status(404).json({ message: "Produit non trouvé." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du Produit." });
    }
}
module.exports = {
    addProductController,
    updateProductController,
    deleteProductController
};
