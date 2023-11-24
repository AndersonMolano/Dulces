import "../../css/registrar.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    // Recopila los datos de registro del formulario
    const data = {
      Nombre: formData.username,
      CorreoElectronico: formData.email,
      Contrasena: formData.password,
    };
    console.log(data); // Verifica los datos en la consola
    // Reemplaza la URL con la dirección correcta de tu servidor
    const apiUrl = 'http://localhost:3000/api/users';
  
    // Realiza una solicitud POST al servidor para registrar al usuario
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data); // Agrega esta línea para ver la respuesta completa
        if (!data.error) {
          // Si no hay error en la respuesta, considera el registro exitoso
          console.log('Registro exitoso');
          navigate('/login');
        } else {
          // Si hay un error en la respuesta, muestra el mensaje de error
          console.error('Error en el registro', data.error);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud', error);
      });
  };
  
  
  return (
    <div className="registro-form">
    <h2 className="titulo1">Registro De Usuarios ^^</h2>
    <h1 className="text2">Nombre:</h1>
    <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleInputChange} />
    <h1 className="text2">Correo Electronico:</h1>
    <input type="text" name="email" placeholder="Correo electrónico" onChange={handleInputChange} />
    <h1 className="text2">Contraseña:</h1>
    <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
    <button onClick={handleRegister} className="button">Registrarse</button>
    <button onClick={() => navigate('/login')} className="button_2">Login</button>
  </div>
  
  );
}

export default Register;
