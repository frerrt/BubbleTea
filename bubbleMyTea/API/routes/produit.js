const connection = require('../config/connection');
const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const produitsController = require("../controllers/produitsController");


router.get("/", (req, res) => {
    connection.query("Select * FROM produits ", (err, rows, fileds) => {
        if (err) throw err;
        res.json(rows);
    })
})

router.get("/:id", (req, res) => {
    const productID = req.params.id;
    connection.query("Select * FROM produits where id = ?", [productID], (err, rows, fileds) => {
        if (err) throw err;
        res.json(rows);
    })
})


router.post("/", produitsController.addProductController);
router.put("/:produit_id", produitsController.updateProductController);
router.delete("/:produit_id", produitsController.deleteProductController);


module.exports = router;