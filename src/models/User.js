const db = require('../db');

const User = {
  crear: (usuario, clave, rol, callback) => {
    db.query('INSERT INTO users (usuario, clave, rol) VALUES (?, ?, ?)', [usuario, clave, rol], callback);
  },
  usuarioSearch: (usuario, callback) => {
    db.query('SELECT * FROM users WHERE usuario = ?', [usuario], callback);
  }
};

module.exports = User;
