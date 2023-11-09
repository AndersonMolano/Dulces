// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // Recopila los datos de inicio de sesión del formulario
    const data = {
      CorreoElectronico: formData.email,
      Contrasena: formData.password,
    };

    // Reemplaza la URL con la dirección correcta de tu servidor
    const apiUrl = 'http://localhost:5000/api/login';

    // Realiza una solicitud POST al servidor para verificar las credenciales
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Inicio de sesión exitoso') {
          // Inicio de sesión exitoso, redirige al usuario a otra página o realiza otras acciones
          console.log('Inicio de sesión exitoso');
          navigate('/home'); // Por ejemplo, redirige al usuario a su área de miembros
        } else {
          // Muestra un mensaje de error al usuario
          console.error('Error en el inicio de sesión', data.error);
          // Puedes mostrar un mensaje de error al usuario aquí
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud', error);
      });
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input type="text" name="email" placeholder="Correo electrónico" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
