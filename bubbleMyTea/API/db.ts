const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "projet",
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur lors de la connexion à la bdd ! : ", err.stack);
        return;
    }
    console.log("Connexion vers la bdd réussie !");
});

module.exports = connection;
