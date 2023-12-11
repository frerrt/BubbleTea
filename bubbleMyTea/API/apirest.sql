CREATE DATABASE IF NOT EXISTS `apirest`;

-- Création de la table roles nom soit admin soit user
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL 
);

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    motDePasse VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Création de la table produits
CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    descriptions VARCHAR(255),
    prix DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
