import React, { useState, useEffect } from 'react';

const SearchComponent = ({ productos, setSearchResults }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Filtrar productos basados en la búsqueda
    const results = productos.filter((producto) =>
      producto.NombreProducto.toLowerCase().includes(search.toLowerCase())
    );

    // Actualizar los resultados de búsqueda en el componente padre
    setSearchResults(results);
  }, [search, productos, setSearchResults]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Verificar si el componente aún está montado antes de actualizar el estado
    if (e.target.tagName === 'INPUT') {
      setSearch(inputValue);
    }
  };

  return (
    <div className="search-container">
      <p className="search-text">¡Escribe Tú Dulce Favorito!</p>
      <div className="search-content">
        
        <input
          value={search}
          onChange={handleInputChange}
          type="text"
          placeholder="Search"
          className="form-control"
        />
      </div>
    </div>
  );  
};

export default SearchComponent;
