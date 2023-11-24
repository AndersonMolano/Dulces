// SearchComponent.js
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
    setSearch(e.target.value);
  };

  return (
    <div>
      <input value={search} onChange={handleInputChange} type="text" placeholder="Search" className="form-control" />
    </div>
  );
};

export default SearchComponent;
