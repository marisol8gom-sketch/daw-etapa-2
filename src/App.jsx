import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import Pedido from './components/Pedido';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pedido" element={<Pedido />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;