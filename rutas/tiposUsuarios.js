const express = require('express');
const router = express.Router();
const db = require('../conexion/bd'); // Importar el módulo de conexión a la base de datos

// Ruta para obtener todos los tipos de usuarios
router.get('/consulta', (req, res) => {
  db.query('SELECT * FROM usu_tipo_usuarios', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows);
  });
});

// Ruta para obtener un tipo de usuario por ID
router.get('/consulta/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usu_tipo_usuarios WHERE id_tipo = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows[0]);
  });
});

// Ruta para crear un nuevo tipo de usuario
router.post('/crear', (req, res) => {
  const { nom_tipo, desc_tipo } = req.body;
  const query = 'INSERT INTO usu_tipo_usuarios (nom_tipo, desc_tipo) VALUES ($1, $2) RETURNING id_tipo';
  db.query(query, [nom_tipo, desc_tipo], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ id: results.rows[0].id_tipo });
  });
});

// Ruta para actualizar un tipo de usuario
router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { nom_tipo, desc_tipo } = req.body;
  const query = 'UPDATE usu_tipo_usuarios SET nom_tipo = $1, desc_tipo = $2 WHERE id_tipo = $3';
  db.query(query, [nom_tipo, desc_tipo, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Tipo de usuario actualizado' });
  });
});

// Ruta para eliminar un tipo de usuario
router.delete('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM usu_tipo_usuarios WHERE id_tipo = $1';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Tipo de usuario eliminado' });
  });
});

module.exports = router;
