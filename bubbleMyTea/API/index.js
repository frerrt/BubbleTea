// index.js
require('events').EventEmitter.defaultMaxListeners = 15;
const express = require("express");
const jwt = require("jsonwebtoken");
const connection = require("./config/connection");
const users = require("./routes/user");
const produits = require("./routes/produit");
const admin = require("./routes/admin");
const { updateProductController } = require('./controllers/produitsController');
const loginRouterMiddleware = require('./routes/login');
const router = express.Router();


const port = 5000;
const app = express();
app.use(express.json());

// Use loginRouterMiddleware directly
app.use(loginRouterMiddleware);

app.use("/users", users);
app.use("/produits", produits);
app.put('/produits/:id', updateProductController);
app.use("/admin", admin);

app.get("/", (req, res) => {
    res.json("Bienvenue sur l'API");
});

app.get("/jwt", (req, res) => {
    const createToken = (jsonData, options = {}) => {
        try {
            const secretKey = "test";
            const token = jwt.sign(jsonData, secretKey, options);
            return token;
        } catch (error) {
            console.log("Error : ", error.message);
            return null;
        }
    };

    const jsonData = { email: "karim@benzema.com", password: "benzema" };
    const token = createToken(jsonData);
    if (token) {
        res.json({ status: true, token: token });
    } else {
        res.json({ status: false, token: false });
    }
});

console.log('Middleware for /login registered.');
app.listen(port, () => {
    console.log("Serveur lancé sur le port : ", port);
});

module.exports = router;