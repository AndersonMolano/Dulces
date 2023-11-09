const mysql = require('mysql');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dulces'
});

// Conéctate a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Realiza una consulta de ejemplo
connection.query('SELECT * FROM usuarios', (error, results) => {
  if (error) {
    console.error('Error al realizar la consulta:', error);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// Cierra la conexión cuando hayas terminado
connection.end((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err);
    return;
  }
  console.log('Conexión cerrada');  
});
