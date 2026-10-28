import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Carrito() {
  const navigate = useNavigate();

  // Estados para la API Externa Real de Muebles
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [cargandoApi, setCargandoApi] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  // Estado del carrito inicial
  const [carrito, setCarrito] = useState([
    { id: 1, title: 'Colchón Matrimonial Confort', price: 280.00, quantity: 1 }
  ]);

  // Estados para la sección de pago
  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState('Tarjeta de Crédito');
  const [nombreTitular, setNombreTitular] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');

  // 🌐 CONSUMO DE API EXTERNA REAL DE MUEBLES (Platzi Fake Store API - Muebles)
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories/3/products?offset=0&limit=8')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la API externa');
        return res.json();
      })
      .then((data) => {
        const nombresMuebles = [
          'Colchón Matrimonial Confort',
          'Sala Moderna Seccional',
          'Cama Matrimonial de Madera',
          'Comedor Familiar 6 Sillas',
          'Ropero Espacioso de 6 Puertas',
          'Sala Esquinera de Cuero',
          'Cama Individual Juvenil',
          'Juego de Comedor Elegante'
        ];

        const productosMuebles = data.map((item, index) => {
          let imageUrl = item.images && item.images[0] ? item.images[0] : '';
          imageUrl = imageUrl.replace(/["\[\]]/g, '');

          return {
            id: item.id,
            title: nombresMuebles[index] || item.title,
            price: Number((item.price * 15).toFixed(2)),
            image: imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop'
          };
        });

        setProductosDisponibles(productosMuebles);
        setCargandoApi(false);
      })
      .catch((err) => {
        console.error('Error al consumir la API externa:', err);
        setErrorApi('No se pudo cargar la API externa de muebles.');
        setCargandoApi(false);
      });
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = (prod) => {
    const existe = carrito.find((item) => item.id === prod.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { id: prod.id, title: prod.title, price: prod.price, quantity: 1 }]);
    }
  };

  // Cambiar cantidad (+ / -)
  const cambiarCantidad = (id, delta) => {
    setCarrito(
      carrito.map((item) => {
        if (item.id === id) {
          const nuevaCantidad = item.quantity + delta;
          return nuevaCantidad > 0 ? { ...item, quantity: nuevaCantidad } : item;
        }
        return item;
      })
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Cálculo total dinámico
  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Procesar el pago y enviar método de pago a la vista de pedido
  const handleProcesarPago = (e) => {
    e.preventDefault();
    navigate('/pedido', { state: { metodo: metodoPago } });
  };

  return (
    <div className="container py-2">
      <h2 className="text-center fw-bold mb-4">Carrito de Compras</h2>

      <div className="row g-4">
        {/* Columna Izquierda: Catálogo Muebles API y Carrito */}
        <div className="col-lg-7">
          
          {/* SECCIÓN API EXTERNA DE MUEBLES */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span className="fw-bold">Catálogo Muebles Mega Oferta (API Externa)</span>
              <span className="badge bg-light text-primary">HTTPS Live Data</span>
            </div>
            <div className="card-body">
              {cargandoApi && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-2 text-muted small">Cargando catálogo de muebles desde la API externa...</p>
                </div>
              )}

              {errorApi && <div className="alert alert-warning text-center small">{errorApi}</div>}

              {!cargandoApi && !errorApi && (
                <div className="list-group">
                  {productosDisponibles.map((prod) => (
                    <div key={prod.id} className="list-group-item d-flex justify-content-between align-items-center py-2">
                      <div className="d-flex align-items-center">
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
                          className="me-3 shadow-sm"
                        />
                        <div>
                          <strong className="d-block text-truncate" style={{ maxWidth: '230px' }}>{prod.title}</strong>
                          <span className="text-success fw-bold">${prod.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-primary btn-sm rounded-circle"
                        onClick={() => agregarAlCarrito(prod)}
                        title="Agregar mueble"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* LISTADO INTERACTIVO DEL CARRITO */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white fw-bold">
              Tus Productos Seleccionados ({carrito.length})
            </div>
            <div className="card-body">
              {carrito.length === 0 ? (
                <p className="text-center text-muted my-3">El carrito está vacío.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                              <span className="btn btn-light disabled">{item.quantity}</span>
                              <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                            </div>
                          </td>
                          <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(item.id)}>
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Columna Derecha: Resumen y Formulario de Pago */}
        <div className="col-lg-5">
          <div className="card shadow border-0 p-3 sticky-top" style={{ top: '20px' }}>
            <h4 className="fw-bold border-bottom pb-2">Resumen del Pedido</h4>
            
            <div className="d-flex justify-content-between my-3 fs-5">
              <span>Total a Pagar:</span>
              <strong className="text-success">${calcularTotal()}</strong>
            </div>

            {!mostrarPago ? (
              <button 
                className="btn btn-warning w-100 fw-bold btn-lg shadow-sm"
                disabled={carrito.length === 0}
                onClick={() => setMostrarPago(true)}
              >
                Proceder al Pago 💳
              </button>
            ) : (
              <form onSubmit={handleProcesarPago} className="border-top pt-3">
                <h5 className="fw-bold text-primary mb-3">Procesar Pago</h5>
                
                <div className="mb-3">
                  <label className="form-label small fw-bold">Método de Pago</label>
                  <select 
                    className="form-select"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="Tarjeta de Crédito">Tarjeta de Crédito / Débito</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    <option value="Efectivo contra Entrega">Efectivo contra Entrega</option>
                  </select>
                </div>

                {metodoPago === 'Tarjeta de Crédito' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Titular de la Tarjeta</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre en la tarjeta"
                        value={nombreTitular}
                        onChange={(e) => setNombreTitular(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Número de Tarjeta</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                        required 
                      />
                    </div>
                  </>
                )}

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success btn-lg fw-bold">
                    Confirmar y Pagar ${calcularTotal()}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-link text-secondary btn-sm"
                    onClick={() => setMostrarPago(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;