const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dulces'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Ruta para obtener la lista de usuarios
app.get('/api/users', (req, res) => {
  // Consultar la base de datos para obtener la lista de usuarios
  const query = 'SELECT * FROM Usuarios';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const { Nombre, CorreoElectronico, Contrasena } = req.body;
  // Verifica que los campos requeridos estén presentes en el cuerpo de la solicitud
  if (!Nombre || !CorreoElectronico || !Contrasena) {
    return res.status(400).json({ error: 'Los campos Nombre, CorreoElectronico y Contrasena son requeridos' });
  }
  const query = 'INSERT INTO Usuarios (Nombre, CorreoElectronico, Contrasena) VALUES (?, ?, ?)';
  connection.query(query, [Nombre, CorreoElectronico, Contrasena], (error, results) => {
    if (error) {
      console.error('Error al crear un usuario:', error);
      res.status(500).json({ error: 'Error al crear un usuario' });
    } else {
      res.json({ message: 'Usuario creado con éxito', userId: results.insertId });
    }
  });
});

// Ruta para obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM Usuarios WHERE UsuarioID = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al consultar el usuario:', error);
      res.status(500).json({ error: 'Error al consultar el usuario' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Ruta para actualizar un usuario por ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { Nombre, CorreoElectronico, Contrasena } = req.body;
  const query = 'UPDATE Usuarios SET Nombre = ?, CorreoElectronico = ?, Contrasena = ? WHERE UsuarioID = ?';
  connection.query(query, [Nombre, CorreoElectronico, Contrasena, userId], (error, results) => {
    if (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      res.json({ message: 'Usuario actualizado con éxito' });
    }
  });
});

// Ruta para eliminar un usuario por ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM Usuarios WHERE UsuarioID = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado con éxito' });
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor Node.js escuchando en el puerto 3000');
});
