const express = require('express');
const router = express.Router();
const db = require('../conexion/bd'); // Importar el módulo de conexión a la base de datos

// Ruta para obtener todos los usuarios
router.get('/consulta', (req, res) => {
  db.query('SELECT * FROM usu_usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows);
  });
});

// Ruta para obtener un usuario por ID
router.get('/consulta/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usu_usuarios WHERE id_usuario = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows[0]);
  });
});

// Ruta para crear un nuevo usuario
router.post('/crear', (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, nom_usuario, contrasena, id_usu_tipo, id_usu_estado } = req.body;
  const query = 'INSERT INTO usu_usuarios (nombre, apellido_paterno, apellido_materno, nom_usuario, contrasena, id_usu_tipo, id_usu_estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario';
  db.query(query, [nombre, apellido_paterno, apellido_materno, nom_usuario, contrasena, id_usu_tipo, id_usu_estado], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ id: results.rows[0].id_usuario });
  });
});

// Ruta para actualizar un usuario
router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, apellido_paterno, apellido_materno, nom_usuario, contrasena, id_usu_tipo, id_usu_estado } = req.body;
  const query = 'UPDATE usu_usuarios SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, nom_usuario = $4, contrasena = $5, id_usu_tipo = $6, id_usu_estado = $7 WHERE id_usuario = $8';
  db.query(query, [nombre, apellido_paterno, apellido_materno, nom_usuario, contrasena, id_usu_tipo, id_usu_estado, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Usuario actualizado' });
  });
});

// Ruta para eliminar un usuario
router.delete('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM usu_usuarios WHERE id_usuario = $1';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
