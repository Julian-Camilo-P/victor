// Datos de los productos
const productos = {
    1: {
        nombre: "Pulsera Clásica Dorada",
        precio: "$125.000",
        imagen: "imagenes/balines dorados.jpeg",
        descripcion: "Elegante pulsera con diseño tradicional en balinería y acabado dorado de alta calidad. Perfecta para ocasiones formales y uso diario.",
        caracteristicas: [
            "Material: Acero inoxidable con baño de oro",
            "Técnica: Balinería tradicional",
            "Cierre: Seguro de resorte",
            "Ajuste: Universal para muñecas de 15-18 cm",
            "Garantía: 1 año contra defectos de fabricación"
        ]
    },
    2: {
        nombre: "Pulsera Van Cleef Dorada",
        precio: "$165.000",
        imagen: "imagenes/van cleef dorada.jpeg",
        descripcion: "Diseño contemporáneo con balinería de diferentes tamaños y acabado plateado brillante. Ideal para quienes buscan un estilo moderno y sofisticado.",
        caracteristicas: [
            "Material: Acero quirúrgico 316L",
            "Técnica: Balinería multiformato",
            "Cierre: Doble seguro magnético",
            "Ajuste: Personalizable",
            "Resistente al agua y al sudor"
        ]
    },
    3: {
        nombre: "Pulsera Van Cleef negra",
        precio: "$150.000",
        imagen: "imagenes/van cleef negra.jpeg",
        descripcion: "Edición especial con balinería de alta gama y detalles únicos en acabado dorado rosa. Una pieza exclusiva para ocasiones especiales.",
        caracteristicas: [
            "Material: Acero inoxidable con baño de oro rosa",
            "Técnica: Balinería premium de precisión",
            "Cierre: Seguro de lujo con doble mecanismo",
            "Incluye: Estuche de regalo premium",
            "Garantía: 2 años"
        ]
    },
    4: {
        nombre: "Pulsera Van Cleef Roja",
        precio: "$150.000",
        imagen: "imagenes/van cleef roja.jpeg",
        descripcion: "Diseño vanguardista con patrones geométricos en acabado negro mate resistente. Para quienes buscan un estilo urbano y contemporáneo.",
        caracteristicas: [
            "Material: Acero con recubrimiento PVD negro",
            "Técnica: Balinería geométrica artesanal",
            "Cierre: Seguro deslizante ajustable",
            "Resistente: A rayaduras y desgaste",
            "Estilo: Unisex"
        ]
    },
    5: {
        nombre: "Anillo Clásico Dorado",
        precio: "$50.000",
        imagen: "imagenes/AnilloDiseñoExclusivo.jpg",
        descripcion: "Anillo tradicional con diseño en balinería y acabado dorado de larga duración. Elegancia atemporal para cualquier ocasión.",
        caracteristicas: [
            "Material: Acero inoxidable con baño de oro",
            "Técnica: Balinería tradicional",
            "Tallas disponibles: 12-20",
            "Acabado: Brillante de alta resistencia",
            "Incluye: Estuche de regalo"
        ]
    },
    6: {
        nombre: "Anillo Tres Carriles Diamantado",
        precio: "$75.000",
        imagen: "imagenes/AnilloTresCarriles.jpg",
        descripcion: "Diseño contemporáneo con detalles únicos en balinería y acabado plateado brillante. Perfecto para complementar tu estilo personal.",
        caracteristicas: [
            "Material: Acero quirúrgico 316L",
            "Técnica: Balinería con diseño asimétrico",
            "Tallas disponibles: 12-20",
            "Acabado: Plateado brillante resistente",
            "Garantía: 1 año"
        ]
    },
    7: {
        nombre: "Anillo Tres Carriles Liso",
        precio: "$50.000",
        imagen: "imagenes/AnilloTresCarrilesLiso.jpg",
        descripcion: "Diseño contemporáneo con dije central en balinería y cadena ajustable. Una pieza versátil que combina con cualquier estilo.",
        caracteristicas: [
            "Material: Acero inoxidable con baño de plata",
            "Longitud: Cadena ajustable 40-50 cm",
            "Dije: Diseño en balinería de 3 cm",
            "Cierre: Seguro de resorte",
            "Resistente: Al agua y la oxidación"
        ]
    },
    8: {
        nombre: "Manilla 7 Balines Diamantada",
        precio: "$120.000",
        imagen: "imagenes/Manilla7BalinesDiamantada.jpg",
        descripcion: "Edición limitada con diseño exclusivo y detalles en balinería de alta calidad. La pieza perfecta para hacer una declaración de estilo.",
        caracteristicas: [
            "Material: Acero quirúrgico premium",
            "Longitud: 45 cm con extensión de 5 cm",
            "Dije: Diseño exclusivo en balinería",
            "Cierre: Seguro de doble bloqueo",
            "Incluye: Certificado de autenticidad"
        ]
    },
    9: {
        nombre: "Manilla Bolsa Dinero",
        precio: "$120.000",
        imagen: "imagenes/ManillaBolsaDinero.jpg",
        descripcion: "Edición limitada con diseño exclusivo y detalles en balinería de alta calidad. La pieza perfecta para hacer una declaración de estilo.",
        caracteristicas: [
            "Material: Acero quirúrgico premium",
            "Longitud: 45 cm con extensión de 5 cm",
            "Dije: Diseño exclusivo en balinería",
            "Cierre: Seguro de doble bloqueo",
            "Incluye: Certificado de autenticidad"
        ]

    },
    10: {
        nombre: "Manilla Diamantada Centrado",
        precio: "$120.000",
        imagen: "imagenes/ManillaDiamantadaCentro.jpg",
        descripcion: "Edición limitada con diseño exclusivo y detalles en balinería de alta calidad. La pieza perfecta para hacer una declaración de estilo.",
        caracteristicas: [
            "Material: Acero quirúrgico premium",
            "Longitud: 45 cm con extensión de 5 cm",
            "Dije: Diseño exclusivo en balinería",
            "Cierre: Seguro de doble bloqueo",
            "Incluye: Certificado de autenticidad"
        ]
    },
    11: {
        nombre: "Manilla Dollar",
        precio: "$150.000",
        imagen: "imagenes/ManillaDollar.jpg",
        descripcion: "Edición limitada con diseño exclusivo y detalles en balinería de alta calidad. La pieza perfecta para hacer una declaración de estilo.",
        caracteristicas: [
            "Material: Acero quirúrgico premium",
            "Longitud: 45 cm con extensión de 5 cm",
            "Dije: Diseño exclusivo en balinería",
            "Cierre: Seguro de doble bloqueo",
            "Incluye: Certificado de autenticidad"
        ]
    },
    12: {
        nombre: "Manilla Full Balin Liso",
        precio: "$115.000",
        imagen: "imagenes/ManillaFullBalinLiso.jpg",
        descripcion: "Edición limitada con diseño exclusivo y detalles en balinería de alta calidad. La pieza perfecta para hacer una declaración de estilo.",
        caracteristicas: [
            "Material: Acero quirúrgico premium",
            "Longitud: 45 cm con extensión de 5 cm",
            "Dije: Diseño exclusivo en balinería",
            "Cierre: Seguro de doble bloqueo",
            "Incluye: Certificado de autenticidad"
        ]
    },

};

// Sistema de autenticación
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM para autenticación
    const authNav = document.getElementById('auth-nav');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    // Verificar si el usuario ya está autenticado
    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            // Usuario autenticado
            authNav.innerHTML = `
            <div class="user-menu">
              <button class="user-menu-btn">
                <span>${user.name}</span>
                <span>▼</span>
              </button>
              <div class="user-dropdown">
                <a href="miperfil.html" id="profileLink">Mi Perfil</a>
                <a href="#" id="logoutLink">Cerrar Sesión</a>
              </div>
            </div>
          `;

            // Agregar eventos para los enlaces del menú de usuario
            document.getElementById('logoutLink').addEventListener('click', logout);
        } else {
            // Usuario no autenticado
            authNav.innerHTML = `
            <li><a href="#" id="loginLink">Iniciar Sesión</a></li>
          `;
            document.getElementById('loginLink').addEventListener('click', showLoginModal);
        }
    }

    // Mostrar modal de inicio de sesión
    function showLoginModal() {
        loginModal.style.display = 'flex';
    }

    // Mostrar modal de registro
    function showRegisterModal() {
        registerModal.style.display = 'flex';
    }

    // Cerrar modales
    function closeModals() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        loginError.style.display = 'none';
        loginSuccess.style.display = 'none';
        registerError.style.display = 'none';
        registerSuccess.style.display = 'none';
    }

    // Iniciar sesión
    function login(email, password) {
        // Obtener usuarios del localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar usuario actual en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Mostrar mensaje de éxito
            loginSuccess.textContent = '¡Inicio de sesión exitoso!';
            loginSuccess.style.display = 'block';

            // Actualizar interfaz después de un breve retraso
            setTimeout(() => {
                closeModals();
                checkAuthStatus();
            }, 1500);

            return true;
        } else {
            // Mostrar mensaje de error
            loginError.textContent = 'Correo electrónico o contraseña incorrectos';
            loginError.style.display = 'block';
            return false;
        }
    }

    // Registrar nuevo usuario
    function register(name, email, password) {
        // Obtener usuarios del localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el usuario ya existe
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            registerError.textContent = 'Ya existe un usuario con este correo electrónico';
            registerError.style.display = 'block';
            return false;
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            registrationDate: new Date().toISOString()
        };

        // Guardar usuario
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Iniciar sesión automáticamente
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Mostrar mensaje de éxito
        registerSuccess.textContent = '¡Cuenta creada exitosamente!';
        registerSuccess.style.display = 'block';

        // Actualizar interfaz después de un breve retraso
        setTimeout(() => {
            closeModals();
            checkAuthStatus();
        }, 1500);

        return true;
    }

    // Cerrar sesión
    function logout() {
        localStorage.removeItem('currentUser');
        checkAuthStatus();
    }

    // Validar formulario de registro
    function validateRegisterForm(name, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            registerError.textContent = 'Las contraseñas no coinciden';
            registerError.style.display = 'block';
            return false;
        }

        if (password.length < 6) {
            registerError.textContent = 'La contraseña debe tener al menos 6 caracteres';
            registerError.style.display = 'block';
            return false;
        }

        return true;
    }

    // Event Listeners para autenticación
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
    });

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (validateRegisterForm(name, email, password, confirmPassword)) {
            register(name, email, password);
        }
    });

    showRegister.addEventListener('click', function (e) {
        e.preventDefault();
        closeModals();
        showRegisterModal();
    });

    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        closeModals();
        showLoginModal();
    });

    closeLogin.addEventListener('click', closeModals);
    closeRegister.addEventListener('click', closeModals);

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function (e) {
        if (e.target === loginModal) {
            closeModals();
        }
        if (e.target === registerModal) {
            closeModals();
        }
    });

    // Inicializar estado de autenticación
    checkAuthStatus();

    // Funcionalidad del carrito
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.addEventListener('click', async function() {
        // Verificar autenticación con API
        try {
          const response = await fetch('/api/auth/me', {
            credentials: 'include'
          });
          const data = await response.json();
          if (!data.user) {
            alert('Por favor, inicia sesión para ver tu carrito.');
            showLoginModal();
            return;
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          alert('Por favor, inicia sesión para ver tu carrito.');
          showLoginModal();
          return;
        }
        // Redirigir a la sección del carrito en miperfil.html
        window.location.href = 'miperfil.html#carrito';
      });
    }

    // Funcionalidad de búsqueda y filtros (guardamos elementos por si se carga este script en páginas sin filtros)
    const busquedaInput = document.getElementById('busqueda');
    const categoriaSelect = document.getElementById('categoria');
    const precioSelect = document.getElementById('precio');
    const aplicarFiltrosBtn = document.getElementById('aplicar-filtros');
    const limpiarFiltrosBtn = document.getElementById('limpiar-filtros');
    const ordenarSelect = document.getElementById('ordenar');
    const productosContainer = document.getElementById('lista-productos');
    const cards = productosContainer ? Array.from(productosContainer.querySelectorAll('.card')) : [];

    // Función para filtrar productos
    function filtrarProductos() {
        const terminoBusqueda = busquedaInput ? busquedaInput.value.toLowerCase() : '';
        const categoriaSeleccionada = categoriaSelect ? categoriaSelect.value : 'todos';
        const rangoPrecio = precioSelect ? precioSelect.value : 'todos';

        cards.forEach(card => {
            const nombreProducto = card.querySelector('h3').textContent.toLowerCase();
            const categoriaProducto = card.getAttribute('data-categoria');
            const precioProducto = parseInt(card.getAttribute('data-precio'));

            let coincideBusqueda = nombreProducto.includes(terminoBusqueda);
            let coincideCategoria = categoriaSeleccionada === 'todos' || categoriaProducto === categoriaSeleccionada;
            let coincidePrecio = rangoPrecio === 'todos' || verificarRangoPrecio(precioProducto, rangoPrecio);

            if (coincideBusqueda && coincideCategoria && coincidePrecio) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Actualizar título del catálogo (si existe en la página)
        const catalogoTitulo = document.querySelector('.catalogo-titulo');
        if (catalogoTitulo) {
            const productosVisibles = cards.filter(card => card.style.display !== 'none').length;
            catalogoTitulo.textContent = productosVisibles === cards.length ?
                'Todos los Productos' :
                `Productos Encontrados (${productosVisibles})`;
        }
    }

    // Función para verificar si el precio está en el rango seleccionado
    function verificarRangoPrecio(precio, rango) {
        switch (rango) {
            case '120-140':
                return precio >= 120000 && precio <= 140000;
            case '140-160':
                return precio >= 140000 && precio <= 160000;
            case '160-180':
                return precio >= 160000 && precio <= 180000;
            default:
                return true;
        }
    }

    // Función para ordenar productos
    function ordenarProductos() {
        const criterio = ordenarSelect.value;
        const productosVisibles = cards.filter(card => card.style.display !== 'none');

        productosVisibles.sort((a, b) => {
            const nombreA = a.querySelector('h3').textContent.toLowerCase();
            const nombreB = b.querySelector('h3').textContent.toLowerCase();
            const precioA = parseInt(a.getAttribute('data-precio'));
            const precioB = parseInt(b.getAttribute('data-precio'));

            switch (criterio) {
                case 'precio-asc':
                    return precioA - precioB;
                case 'precio-desc':
                    return precioB - precioA;
                case 'nombre':
                    return nombreA.localeCompare(nombreB);
                case 'popularidad':
                default:
                    return 0; // Mantener orden original
            }
        });

        // Reorganizar los productos en el contenedor
        productosVisibles.forEach(card => {
            productosContainer.appendChild(card);
        });
    }

    // Función para limpiar filtros
    function limpiarFiltros() {
        busquedaInput.value = '';
        categoriaSelect.value = 'todos';
        precioSelect.value = 'todos';
        ordenarSelect.value = 'popularidad';
        filtrarProductos();
    }

    // Event Listeners para filtros (añadir solo si existen los elementos)
    if (aplicarFiltrosBtn) aplicarFiltrosBtn.addEventListener('click', filtrarProductos);
    if (limpiarFiltrosBtn) limpiarFiltrosBtn.addEventListener('click', limpiarFiltros);
    if (ordenarSelect) ordenarSelect.addEventListener('change', ordenarProductos);

    // Búsqueda en tiempo real
    if (busquedaInput) busquedaInput.addEventListener('input', filtrarProductos);

    // Funcionalidad del modal de productos
    const modal = document.getElementById('modal-producto');
    const cerrarModal = document.getElementById('cerrar-modal');
    const modalNombre = document.getElementById('modal-nombre');
    const modalPrecio = document.getElementById('modal-precio');
    const modalImagen = document.getElementById('modal-imagen');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalCaracteristicas = document.getElementById('modal-caracteristicas');

    // Abrir modal al hacer clic en "Ver Detalles"
    document.querySelectorAll('.btn-detalle').forEach(boton => {
        boton.addEventListener('click', function () {
            const productoId = this.getAttribute('data-producto');
            const producto = productos[productoId];

            if (producto) {
                modalNombre.textContent = producto.nombre;
                modalPrecio.textContent = producto.precio;
                modalImagen.src = producto.imagen;
                modalImagen.alt = producto.nombre;
                modalDescripcion.textContent = producto.descripcion;

                // Limpiar características anteriores
                modalCaracteristicas.innerHTML = '';

                // Agregar nuevas características
                producto.caracteristicas.forEach(caracteristica => {
                    const li = document.createElement('li');
                    li.textContent = caracteristica;
                    modalCaracteristicas.appendChild(li);
                });

                modal.style.display = 'block';
            }
        });
    });

    // Cerrar modal
    cerrarModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Funcionalidad para agregar al carrito
    document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
        boton.addEventListener('click', async function () {
            const productoId = this.getAttribute('data-producto');
            const producto = productos[productoId];

            // Verificar autenticación con API
            try {
              const response = await fetch('/api/auth/me', {
                credentials: 'include'
              });
              const data = await response.json();
              if (!data.user) {
                alert('Por favor, inicia sesión para agregar productos al carrito.');
                showLoginModal();
                return;
              }
            } catch (error) {
              console.error('Error checking auth:', error);
              alert('Por favor, inicia sesión para agregar productos al carrito.');
              showLoginModal();
              return;
            }

            // Agregar al carrito
            agregarAlCarrito(productoId, producto);
        });
    });

    // Función para agregar producto al carrito
    function agregarAlCarrito(productoId, producto) {
        // Obtener carrito del localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.id === productoId);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: productoId,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
        }

        // Guardar carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar mensaje de éxito
        alert(`¡${producto.nombre} agregado al carrito!`);
    }

    // Event listener para el botón de agregar al carrito en el modal
    document.getElementById('agregar-carrito-modal').addEventListener('click', async function () {
        const productoId = document.querySelector('.btn-detalle.active')?.getAttribute('data-producto');
        if (productoId) {
            const producto = productos[productoId];

            // Verificar autenticación con API
            try {
              const response = await fetch('/api/auth/me', {
                credentials: 'include'
              });
              const data = await response.json();
              if (!data.user) {
                alert('Por favor, inicia sesión para agregar productos al carrito.');
                showLoginModal();
                return;
              }
            } catch (error) {
              console.error('Error checking auth:', error);
              alert('Por favor, inicia sesión para agregar productos al carrito.');
              showLoginModal();
              return;
            }

            agregarAlCarrito(productoId, producto);
            modal.style.display = 'none';
        }
    });

    // Marcar el botón activo cuando se abre el modal
    document.querySelectorAll('.btn-detalle').forEach(boton => {
        boton.addEventListener('click', function () {
            document.querySelectorAll('.btn-detalle').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Botón "Comprar Ahora" del modal: guarda pedido y redirige a checkout
    const btnComprarAhora = document.getElementById('comprar-ahora');
    if (btnComprarAhora) {
        btnComprarAhora.addEventListener('click', async function () {
            const productoId = document.querySelector('.btn-detalle.active')?.getAttribute('data-producto');
            if (!productoId) return;

            const producto = productos[productoId];

            // Verificar autenticación con API
            try {
              const response = await fetch('/api/auth/me', {
                credentials: 'include'
              });
              const data = await response.json();
              if (!data.user) {
                alert('Por favor, inicia sesión para realizar una compra.');
                showLoginModal();
                return;
              }
            } catch (error) {
              console.error('Error checking auth:', error);
              alert('Por favor, inicia sesión para realizar una compra.');
              showLoginModal();
              return;
            }

            // Parsear precio numérico (ej: "$125.000" -> 125000)
            const precioNum = parseInt((producto.precio || '').replace(/[^0-9]/g, ''), 10) || 0;

            const pedido = {
                tipo: 'catalogo',
                producto: {
                    id: productoId,
                    nombre: producto.nombre,
                    imagen: producto.imagen
                },
                cantidad: 1,
                total: precioNum,
                precioFormateado: producto.precio,
                fecha: new Date().toISOString()
            };

            // Guardar pedido y redirigir
            localStorage.setItem('pedidoActual', JSON.stringify(pedido));
            window.location.href = 'checkout.html';
        });
    }
});

// En la función que maneja el botón "Comprar ahora", agregar:
async function comprarAhora(producto) {
  // Verificar autenticación con API
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });
    const data = await response.json();
    if (!data.user) {
      alert('Por favor, inicia sesión para realizar una compra.');
      showLoginModal();
      return;
    }
  } catch (error) {
    console.error('Error checking auth:', error);
    alert('Por favor, inicia sesión para realizar una compra.');
    showLoginModal();
    return;
  }

  // Crear objeto de pedido
  const pedido = {
    tipo: 'catalogo',
    producto: producto,
    cantidad: 1,
    total: producto.precio,
    fecha: new Date().toISOString()
  };

  // Guardar pedido en localStorage
  localStorage.setItem('pedidoActual', JSON.stringify(pedido));

  // Redirigir a checkout
  window.location.href = 'checkout.html';
}
