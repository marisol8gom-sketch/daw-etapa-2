import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [registrado, setRegistrado] = useState(false);
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault(); // Evita que la página se recargue por defecto
    setRegistrado(true); // Muestra el mensaje de éxito
  };

  const handleIrLogin = () => {
    navigate('/'); // Te redirige al Login
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow border-0 p-4">
          <h2 className="text-center text-success fw-bold mb-4">Crear Cuenta</h2>
          
          {!registrado ? (
            <form onSubmit={handleRegistro}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ingresa tu nombre" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Ingresa tu correo" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Crea una contraseña" 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-success w-100 btn-lg mt-3">
                Registrarse
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="alert alert-success py-4">
                <h4 className="fw-bold mb-2">¡Registro Exitoso!</h4>
                <p className="mb-0">Tu cuenta ha sido creada correctamente en Almacenes Mega Oferta.</p>
              </div>
              <button 
                type="button" 
                className="btn btn-primary w-100 btn-lg mt-3"
                onClick={handleIrLogin}
              >
                Ir a Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registro;