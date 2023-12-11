const express = require('express');
const connection = require('../config/connection');

function getAllUsers(callback) {
  connection.query("SELECT * FROM Users", (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}

function getUserById(userId, callback) {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, rows, fields) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, rows, fields) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const user = rows.length > 0 ? rows[0] : null;
          resolve(user);
        }
      }
    );
  });
}

function createUser(name, email, password, callback) {
  const defaultRoleId = 2;

  connection.query(
    "INSERT INTO users (name, password,email, role_id) VALUES (?, ?, ?, ?)",
    [name, password, email, defaultRoleId],
    (err, result) => {
      if (err) throw err;

      callback(result.insertId);
    }
  );
}

async function updateUser(userId, username, roles, motdepasse, email) {
  // Implement your update logic here
  // Return a boolean indicating whether the update was successful
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE users SET username = ?, roles = ?, motdepasse = ?, email = ? WHERE id = ?',
      [username, roles, motdepasse, email, userId],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(false); // Update failed
        } else {
          resolve(result.affectedRows > 0); // Check if any rows were affected
        }
      }
    );
  });
}


module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
};

