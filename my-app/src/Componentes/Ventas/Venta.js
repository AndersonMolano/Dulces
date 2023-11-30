import React, { useState } from 'react';
import '../../css/venta.css';

function Venta() {
  const [clienteID, setClienteID] = useState('');
  const [productoID, setProductoID] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState('');

  const handleCompra = () => {
    // Lógica para manejar el proceso de compra
    // Puedes enviar estos datos a tu backend o realizar acciones adicionales aquí
    console.log('Datos del pedido:', {
      clienteID,
      productoID,
      fechaPedido,
      direccionEntrega,
    });
  };

  return (
    <body>
      <div className='Container'>
        <h1>Compra un producto</h1>
        <form>
          <label htmlFor='clienteID'>Cliente ID:</label>
          <input
            type='text'
            id='clienteID'
            value={clienteID}
            onChange={(e) => setClienteID(e.target.value)}
          />

          <label htmlFor='productoID'>Producto ID:</label>
          <input
            type='text'
            id='productoID'
            value={productoID}
            onChange={(e) => setProductoID(e.target.value)}
          />

          <label htmlFor='fechaPedido'>Fecha de Pedido:</label>
          <input
            type='text'
            id='fechaPedido'
            value={fechaPedido}
            onChange={(e) => setFechaPedido(e.target.value)}
          />

          <label htmlFor='direccionEntrega'>Dirección de Entrega:</label>
          <input
            type='text'
            id='direccionEntrega'
            value={direccionEntrega}
            onChange={(e) => setDireccionEntrega(e.target.value)}
          />

          <button type='button' className='comprar_button' onClick={handleCompra}>
            Comprar el producto
          </button>
        </form>

        <a className='comprar_button' href='/Formulario'>
          Volver
        </a>
      </div>
    </body>
  );
}

export default Venta;
