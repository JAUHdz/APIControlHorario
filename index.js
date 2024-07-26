const express = require('express');
const db = require('./conexion/bd');
const cors = require('cors'); 
const app = express();

const tiposusuariosRoutes = require('./rutas/tiposUsuarios');
const estadosusuariosRoutes = require('./rutas/estadoUsuarios');
const UsuusuariosRoutes = require('./rutas/usuUsuarios');
const ControlHorarioRoutes = require('./rutas/controlHorario');

const port = 3000;
app.use(cors());

app.use(express.json());

app.use('/api/tipousuarios', tiposusuariosRoutes);
app.use('/api/estadousuarios', estadosusuariosRoutes);
app.use('/api/usuusuarios', UsuusuariosRoutes);
app.use('/api/controlhorario', ControlHorarioRoutes);

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en puerto ${port}`);
});