const express = require('express');
const router = express.Router();
const db = require('../conexion/bd'); // Importar el módulo de conexión a la base de datos

// Ruta para obtener todos los estados de usuarios
router.get('/consulta', (req, res) => {
  db.query('SELECT * FROM usu_estado_usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows);
  });
});

// Ruta para obtener un estado de usuario por ID
router.get('/consulta/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usu_estado_usuarios WHERE id_estado = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows[0]);
  });
});

// Ruta para crear un nuevo estado de usuario
router.post('/crear', (req, res) => {
  const { nom_estado, desc_estado } = req.body;
  const query = 'INSERT INTO usu_estado_usuarios (nom_estado, desc_estado) VALUES ($1, $2) RETURNING id_estado';
  db.query(query, [nom_estado, desc_estado], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ id: results.rows[0].id_estado });
  });
});

// Ruta para actualizar un estado de usuario
router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { nom_estado, desc_estado } = req.body;
  const query = 'UPDATE usu_estado_usuarios SET nom_estado = $1, desc_estado = $2 WHERE id_estado = $3';
  db.query(query, [nom_estado, desc_estado, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Estado de usuario actualizado' });
  });
});

// Ruta para eliminar un estado de usuario
router.delete('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM usu_estado_usuarios WHERE id_estado = $1';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Estado de usuario eliminado' });
  });
});

module.exports = router;
