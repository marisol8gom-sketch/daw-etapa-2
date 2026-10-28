import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pedido() {
  const navigate = useNavigate();

  const handleVolverInicio = () => {
    navigate('/'); // Redirige al inicio / Login
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow border-0 p-4">
          <h2 className="text-center text-success fw-bold mb-4">Confirmación de Pedido</h2>
          
          <div className="alert alert-success text-center">
            ¡Tu pedido ha sido procesado con éxito! Gracias por comprar en Almacenes Mega Oferta.
          </div>

          <div className="text-center my-3">
            <h4>Detalles de la Entrega</h4>
            <p className="mb-1"><strong>Estado:</strong> En preparación</p>
            <p><strong>Método de Pago:</strong> Tarjeta de Crédito</p>
          </div>

          <button 
            type="button" 
            className="btn btn-primary w-100 btn-lg mt-3"
            onClick={handleVolverInicio}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pedido;