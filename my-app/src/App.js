import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Register from './Componentes/Register/Register';
import Home from './home';
import Venta from './Componentes/Ventas/Venta';
import Formulario from './Componentes/Panel/Formulario';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/home' element={<Home/>} /> 
      <Route path='/formulario' element={<Formulario />} />
      <Route path='/ventas' element={<Venta/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
