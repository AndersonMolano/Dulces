const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa el módulo cors
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Ajusta esto al origen correcto de tu frontend
  credentials: true,
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dulces',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});


// Ruta para el registro de usuarios
app.post('/api/register', (req, res) => {
  const { Nombre, CorreoElectronico, Contrasena } = req.body;

  // Verifica si el usuario ya existe
  db.query(
    'SELECT * FROM Usuarios WHERE CorreoElectronico = ?',
    [CorreoElectronico],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      // Si el usuario no existe, registra al nuevo usuario en la base de datos
      db.query(
        'INSERT INTO Usuarios (Nombre, CorreoElectronico, Contrasena) VALUES (?, ?, ?)',
        [Nombre, CorreoElectronico, Contrasena],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en el servidor' });
          }
          res.status(201).json({ message: 'Registro exitoso' });
        }
      );
    }
  );
});


app.post('/api/login', (req, res) => {
    const { CorreoElectronico, Contrasena } = req.body;
  
    // Verifica las credenciales en la base de datos
    db.query(
      'SELECT * FROM Usuarios WHERE CorreoElectronico = ? AND Contrasena = ?',
      [CorreoElectronico, Contrasena],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }
  
        if (results.length === 0) {
          // Credenciales incorrectas
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
  
        // Inicio de sesión exitoso
        const usuario = results[0];
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
      }
    );
  });
  
  

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
