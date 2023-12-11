const util = require('util');
const connection = require('../config/connection');
const queryAsync = util.promisify(connection.query).bind(connection);

async function addProduct(nom_produit, descriptions, prix, quantite_stock) {
    try {
        if (!nom_produit || !descriptions || prix === undefined || quantite_stock === undefined) {
            throw new Error("Tous les champs sont obligatoires.");
        }

        const query = "INSERT INTO Produit (nom_produit, descriptions, prix, quantite_stock) VALUES (?, ?, ?, ?)";
        // console.log("Query parameters:", [nom_produit, descriptions, prix, quantite_stock]);
        const result = await connection.query(query, [nom_produit, descriptions, prix, quantite_stock]);


    } catch (error) {
        console.error("Error in addProduct:", error);
        throw error;
    }
}

async function getProduitById(produit_id) {
    try {
        console.log("voici le produit id de getProduitById : " + produit_id);
        const rows = await queryAsync("SELECT * FROM Produit WHERE produit_id = ?", [produit_id]);
        console.log("Rows from getProduitById:", rows);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

async function updateProduct(produit_id, nom_produit, descriptions, prix, quantite_stock) {
 //   console.log("JE suis rentrer dans la fonction update");
    try {
      //  console.log("JE suis rentrer dans la try de la fonction update");
        // Assurez-vous que la connexion existe
        if (!connection) {
            throw new Error('La connexion à la base de données est indisponible.');
        }
       // console.log("Product ID in updateProduct:", produit_id);
        const currentProduct = await getProduitById(produit_id);

       // console.log("Current Product in updateProduct:", currentProduct);

       // console.log("je contine apres la condition !currentProduct");
        if (!currentProduct) {
            // Produit non trouvé
            return { success: false, message: 'Produit non trouvé.' };
        }

        //console.log("je contine apres la condition !currentProduct");
        const newName = nom_produit ? nom_produit : currentProduct.nom_produit;
        const newDescription = descriptions ? descriptions : currentProduct.descriptions;
        const newPrice = prix ? prix : currentProduct.prix;
        const newStock = quantite_stock !== undefined ? quantite_stock : currentProduct.quantite_stock;
       // console.log("J'ai traverse les const");

        // Convertir les valeurs en chaînes avant la comparaison
        const currentName = currentProduct.nom_produit.toString();
        const currentDescription = currentProduct.descriptions.toString();
        const currentPrice = currentProduct.prix.toString();
        const currentStock = currentProduct.quantite_stock.toString();

        // Vérifier si la mise à jour est nécessaire
        if (
            newName.toString() !== currentName ||
            newDescription.toString() !== currentDescription ||
            newPrice.toString() !== currentPrice ||
            newStock.toString() !== currentStock
        ) {
            const updateResult = await connection.query(
                "UPDATE Produit SET nom_produit = ?, descriptions = ?, prix = ?, quantite_stock = ? WHERE produit_id = ?",
                [newName, newDescription, newPrice, newStock, produit_id]
            );

            //  console.log("Update values:", newName, newDescription, newPrice, newStock, produit_id);
            //  console.log("Update result:", updateResult);

            if (updateResult.affectedRows > 0) {
                return { success: true, message: 'Produit mis à jour avec succès.' };
            } else {
                return { success: false, message: 'La mise à jour du produit a échoué.' };
            }
        } else {
            return { success: false, message: 'Aucune mise à jour nécessaire.' };
        }

    } catch (error) {
        console.error("Error in updateProduct:", error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
}






async function deleteProduct(produit_id) {
    try {

        // Assurez-vous que la connexion existe
        if (!connection) {
            return { success: false, message: 'La connexion à la base de données est indisponible.' };
        }

        const query = "DELETE FROM Produit WHERE produit_id = ?";

        const result = await connection.query(query, [produit_id]);

        // console.log("Result of delete query:", result);

        if (!result || typeof result !== 'object' || result.affectedRows === undefined) {
            return { success: false, message: 'Produit supprimé avec succès.' };
        }

        if (result.affectedRows > 0) {
            return { success: true, message: 'Produit supprimé avec succès.' };
        } else {
            return { success: false, message: 'Produit non trouvé.' };
        }
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        return { success: false, message: 'Une erreur s\'est produite lors de la suppression du produit.' };
    }
}






module.exports = {
    addProduct,
    updateProduct,
    deleteProduct
};
