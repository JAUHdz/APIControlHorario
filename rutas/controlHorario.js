const express = require('express');
const router = express.Router();
const db = require('../conexion/bd'); // Importar el módulo de conexión a la base de datos

// Ruta para obtener todos los registros de control de horario
router.get('/consulta', (req, res) => {
  db.query('SELECT * FROM control_horario', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows);
  });
});

// Ruta para obtener un registro de control de horario por ID
router.get('/consulta/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM control_horario WHERE id_control = $1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results.rows[0]);
  });
});

// Ruta para crear un nuevo registro de control de horario
router.post('/crear', (req, res) => {
  const { id_usuario, fecha, hora_entrada, hora_salida, localizacion } = req.body;
  const query = 'INSERT INTO control_horario (id_usuario, fecha, hora_entrada, hora_salida, localizacion) VALUES ($1, $2, $3, $4, $5) RETURNING id_control';
  db.query(query, [id_usuario, fecha, hora_entrada, hora_salida, localizacion], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ id: results.rows[0].id_control });
  });
});

// Ruta para actualizar un registro de control de horario
router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { id_usuario, fecha, hora_entrada, hora_salida, localizacion } = req.body;
  const query = 'UPDATE control_horario SET id_usuario = $1, fecha = $2, hora_entrada = $3, hora_salida = $4, localizacion = $5 WHERE id_control = $6';
  db.query(query, [id_usuario, fecha, hora_entrada, hora_salida, localizacion, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Registro actualizado' });
  });
});

// Ruta para eliminar un registro de control de horario
router.delete('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM control_horario WHERE id_control = $1';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'Registro eliminado' });
  });
});

module.exports = router;
