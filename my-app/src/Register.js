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

    // Reemplaza la URL con la dirección correcta de tu servidor
    const apiUrl = 'http://localhost:5000/api/register';

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
        if (data.message === 'Registro exitoso') {
          // Registro exitoso, puedes redirigir al usuario a otra página o realizar otras acciones
          console.log('Registro exitoso');
          navigate('/login'); // Por ejemplo, redirige al usuario a la página de inicio de sesión
        } else {
          // Muestra un mensaje de error al usuario
          console.error('Error en el registro', data.error);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud', error);
      });
  };

  return (
    <div>
      <h2>Registro</h2>
      <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleInputChange} />
      <input type="text" name="email" placeholder="Correo electrónico" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default Register;
