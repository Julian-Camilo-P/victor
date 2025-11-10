document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const resumenPedido = document.getElementById('resumen-pedido');
  const totalPedido = document.getElementById('total-pedido');
  const metodoPagoOpciones = document.querySelectorAll('.metodo-pago-opcion');
  const detallesTarjeta = document.getElementById('detalles-tarjeta');
  const detallesTransferencia = document.getElementById('detalles-transferencia');
  const btnPagar = document.getElementById('btn-pagar');
  const mensajeExito = document.getElementById('mensaje-exito');
  const numeroPedido = document.getElementById('numero-pedido');

  // Cargar pedido desde localStorage
  const pedido = JSON.parse(localStorage.getItem('pedidoActual'));

  // Inicializar eventos
  function inicializarEventos() {
    // Eventos para selección de método de pago
    metodoPagoOpciones.forEach(opcion => {
      opcion.addEventListener('click', function() {
        metodoPagoOpciones.forEach(o => o.classList.remove('seleccionado'));
        this.classList.add('seleccionado');
        
        const metodo = this.getAttribute('data-metodo');
        
        // Mostrar detalles según el método seleccionado
        if (metodo === 'tarjeta') {
          detallesTarjeta.classList.add('activo');
          detallesTransferencia.classList.remove('activo');
        } else {
          detallesTarjeta.classList.remove('activo');
          detallesTransferencia.classList.add('activo');
        }
      });
    });

    // Evento para procesar pago
    btnPagar.addEventListener('click', procesarPago);
  }

  // Cargar resumen del pedido
  function cargarResumenPedido() {
    if (!pedido) {
      resumenPedido.innerHTML = '<p>No hay productos en el carrito.</p>';
      totalPedido.textContent = '$0';
      return;
    }

    let html = '';

    if (pedido.tipo === 'catalogo') {
      const prod = pedido.producto;
      const precioFormateado = pedido.precioFormateado || (`$${pedido.total.toLocaleString()}`);

      html = `
        <div class="resumen-producto">
          <img src="${prod.imagen}" alt="${prod.nombre}" class="resumen-img" onerror="this.src='imagenes/logo.png'">
          <div class="resumen-info">
            <div class="resumen-nombre">${prod.nombre}</div>
            <div class="resumen-detalles">Cantidad: ${pedido.cantidad}</div>
          </div>
          <div class="resumen-precio">${precioFormateado}</div>
        </div>
      `;

    } else if (pedido.tipo === 'personalizado') {
      // Producto personalizado
      const detalles = pedido.detalles;
      let descripcion = '';

      if (detalles.tipoJoya === 'pulsera') {
        descripcion = `Pulsera con dije ${obtenerNombreDije(detalles.dije)}, color ${detalles.colorHilo}, ${detalles.cantidadBalines} balines`;
      } else {
        descripcion = `Anillo color ${detalles.colorHilo}, ${detalles.cantidadBalines} balines`;
      }

      html = `
        <div class="resumen-producto">
          <img src="imagenes/dijes/${detalles.dije}.jpg" alt="${detalles.tipoJoya === 'pulsera' ? 'Pulsera Personalizada' : 'Anillo Personalizado'}" class="resumen-img" onerror="this.src='imagenes/logo.png'">
          <div class="resumen-info">
            <div class="resumen-nombre">${detalles.tipoJoya === 'pulsera' ? 'Pulsera Personalizada' : 'Anillo Personalizado'}</div>
            <div class="resumen-detalles">${descripcion}</div>
          </div>
          <div class="resumen-precio">$${pedido.total.toLocaleString()}</div>
        </div>
      `;
    }
    else if (pedido.tipo === 'carrito') {
      // Mostrar todos los productos del carrito
      const productos = pedido.productos || [];
      const itemsHtml = productos.map(p => {
        const precioForm = p.precioFormateado || (`$${(p.precio || 0).toLocaleString()}`);
        return `
          <div class="resumen-producto" style="display:flex; align-items:center;">
            <img src="${p.imagen}" alt="${p.nombre}" class="resumen-img" style="width:80px; height:80px; object-fit:cover; margin-right:12px;" onerror="this.src='imagenes/logo.png'">
            <div class="resumen-info" style="flex:1">
              <div class="resumen-nombre">${p.nombre}</div>
              <div class="resumen-detalles">Cantidad: ${p.cantidad}</div>
            </div>
            <div class="resumen-precio">${precioForm}</div>
          </div>
        `;
      }).join('');

      html = `
        <div class="resumen-carrito">
          ${itemsHtml}
        </div>
      `;
    }

    resumenPedido.innerHTML = html;

    // Calcular total con envío (si pedido.total es numérico)
    const totalConEnvio = (Number(pedido.total) || 0) + 10000;
    totalPedido.textContent = `$${totalConEnvio.toLocaleString()}`;
  }

  // Obtener nombre del dije
  function obtenerNombreDije(claveDije) {
    const nombres = {
      "sin-dije": "Sin Dije",
      "van-cleef": "Van Cleef",
      "san-benito": "San Benito",
      "bolsa-dinero": "Bolsa de Dinero",
      "dolar": "Dólar",
      "rolex": "Rolex"
    };
    
    return nombres[claveDije] || "Desconocido";
  }

  // Procesar pago
  function procesarPago() {
    // Validar formulario
    if (!validarFormulario()) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    
    // Validar método de pago seleccionado
    const metodoSeleccionado = document.querySelector('.metodo-pago-opcion.seleccionado');
    if (!metodoSeleccionado) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }
    
    // Simular procesamiento de pago
    btnPagar.disabled = true;
    btnPagar.textContent = 'Procesando...';
    
    // Simular demora de procesamiento
    setTimeout(function() {
      // Generar número de pedido aleatorio
      const numPedido = Math.floor(100000 + Math.random() * 900000);
      numeroPedido.textContent = numPedido;
      
      // Mostrar mensaje de éxito
      mensajeExito.classList.add('activo');
      
      // Guardar pedido en historial
      guardarEnHistorial(numPedido);
      
      // Limpiar pedido actual
      localStorage.removeItem('pedidoActual');
    }, 2000);
  }

  // Validar formulario
  function validarFormulario() {
    const camposRequeridos = [
      'nombre', 'apellido', 'direccion', 'ciudad', 
      'departamento', 'codigo-postal', 'telefono'
    ];
    
    for (const campo of camposRequeridos) {
      const elemento = document.getElementById(campo);
      if (!elemento.value.trim()) {
        return false;
      }
    }
    
    // Validar detalles de tarjeta si está seleccionada
    const metodoSeleccionado = document.querySelector('.metodo-pago-opcion.seleccionado');
    if (metodoSeleccionado && metodoSeleccionado.getAttribute('data-metodo') === 'tarjeta') {
      const camposTarjeta = ['numero-tarjeta', 'fecha-expiracion', 'cvv', 'nombre-tarjeta'];
      for (const campo of camposTarjeta) {
        const elemento = document.getElementById(campo);
        if (!elemento.value.trim()) {
          return false;
        }
      }
    }
    
    return true;
  }

  // Guardar pedido en historial
  function guardarEnHistorial(numeroPedido) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    // Obtener historial actual o crear uno nuevo
    let historial = JSON.parse(localStorage.getItem('historialPedidos')) || {};
    
    // Si el usuario no tiene historial, crear uno
    if (!historial[user.email]) {
      historial[user.email] = [];
    }
    
    // Agregar pedido al historial
    const pedidoCompleto = {
      ...pedido,
      numeroPedido: numeroPedido,
      fecha: new Date().toISOString(),
      estado: 'Completado'
    };
    
    historial[user.email].push(pedidoCompleto);
    
    // Guardar en localStorage
    localStorage.setItem('historialPedidos', JSON.stringify(historial));
  }

  // Inicializar la aplicación
  inicializarEventos();
  cargarResumenPedido();
});