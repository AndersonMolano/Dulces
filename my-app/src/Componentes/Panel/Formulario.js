// Formulario.js
import React, { useState, useEffect } from 'react';
import SearchComponent from '../SearchComponents/SearchComponents';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/formulario.css';

const Formulario = ({ setUser }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET para obtener datos de productos
    axios
      .get('http://localhost:3000/api/productos')
      .then((response) => {
        setProductos(response.data);
        setSearchResults(response.data); // Inicializa los resultados de búsqueda con todos los productos
      })
      .catch((error) => {
        console.error('Error al obtener datos de productos:', error);
      });
  }, []); // Se ejecuta solo una vez al montar el componente

  const updateSearchResults = (results) => {
    setSearchResults(results); // Actualiza los resultados de búsqueda
  };

  return (
    <section className="formulario-section">
      <nav className="navbar">
        <h1 className="logo">MI DULCE ONLINE </h1>
        <SearchComponent productos={productos} setSearchResults={updateSearchResults} />
        <button onClick={() => navigate('/home')} className="register-button">
          Registrar Productos
        </button>
      </nav>
      <div className="card-container">
        {searchResults.length === 0 ? (
          <p>No hay productos para mostrar.</p>
        ) : (
          searchResults.map((producto) => (
            <div key={producto.ProductoID} className="card">
              <h2 className="card-title">{producto.NombreProducto}</h2>
              <p className="card-description">{producto.Descripcion}</p>
              <p className="card-price">Precio: {producto.Precio}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Formulario;
