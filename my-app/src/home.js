import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/RegistroProducto.css';

const RegistroProducto = () => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: '',
    categoriaID: '',
    regionID: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la lista de categorías y regiones al cargar el componente
    const fetchData = async () => {
      try {
        const categoriasResponse = await axios.get('http://localhost:3000/api/categorias');
        const regionesResponse = await axios.get('http://localhost:3000/api/regiones');

        console.log('Categorías:', categoriasResponse.data);
        console.log('Regiones:', regionesResponse.data);

        setCategorias(categoriasResponse.data); // Modificado
        setRegiones(regionesResponse.data); // Modificado
      } catch (error) {
        console.error('Error al obtener categorías y regiones:', error);
        setError('Error al obtener categorías y regiones. Inténtalo de nuevo.');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/productos', formData);

      if (response.data.message === 'Producto registrado con éxito') {
        console.log('Producto registrado con éxito');
        // Limpiar el formulario después del registro exitoso
        setFormData({
          nombreProducto: '',
          descripcion: '',
          precio: '',
          categoriaID: '',
          regionID: '',
        });
        // Limpiar el estado de error
        setError(null);
      } else {
        console.error('Error en el registro del producto:', response.data.error);
        // Mostrar un mensaje de error al usuario
        setError('Error en el registro del producto. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Mostrar un mensaje de error al usuario
      setError('Error en la solicitud. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="registro-producto-container">
      <h2 className="registro-producto-title">Registro de Producto</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="registro-producto-form">
        <label className="registro-producto-label">Nombre del Producto:</label>
        <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleInputChange} className="registro-producto-input" required />

        <label className="registro-producto-label">Descripción:</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="registro-producto-textarea"></textarea>

        <label className="registro-producto-label">Precio:</label>
        <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} className="registro-producto-input" required />

        <label className="registro-producto-label">Categoría:</label>
        <select name="categoriaID" value={formData.categoriaID} onChange={handleInputChange} className="registro-producto-input" required>
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.CategoriaID} value={categoria.CategoriaID}>
              {categoria.NombreCategoria}
            </option>
          ))}
        </select>

        <label className="registro-producto-label">Región:</label>
        <select name="regionID" value={formData.regionID} onChange={handleInputChange} className="registro-producto-input" required>
          <option value="">Seleccionar región</option>
          {regiones.map((region) => (
            <option key={region.RegionID} value={region.RegionID}>
              {region.NombreRegion}
            </option>
          ))}
        </select>

        <br></br>
        <button type="submit" className="registro-producto-button">
          Registrar Producto
        </button>
        <br></br>
        <button onClick={() => navigate('/Formulario')} className="registro-producto-button">
          Volver
        </button>
      </form>
    </div>
  );
};

export default RegistroProducto;
