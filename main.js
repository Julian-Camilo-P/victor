
    // Sistema de autenticación
    document.addEventListener('DOMContentLoaded', function() {
      // Elementos del DOM
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
      async function checkAuthStatus() {
        try {
          const response = await fetch('/api/auth/me', {
            credentials: 'include'
          });
          const data = await response.json();
          const user = data.user;

          if (user) {
            // Usuario autenticado - CORREGIDO: Agregar enlace a miperfil.html
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
        } catch (error) {
          console.error('Error checking auth status:', error);
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
      async function login(email, password) {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok) {
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
            if (data.error === 'invalid_credentials') {
              loginError.textContent = 'Correo electrónico o contraseña incorrectos';
            } else {
              loginError.textContent = data.error || 'Error al iniciar sesión';
            }
            loginError.style.display = 'block';
            return false;
          }
        } catch (error) {
          console.error('Error during login:', error);
          loginError.textContent = 'Error de conexión. Inténtalo de nuevo.';
          loginError.style.display = 'block';
          return false;
        }
      }

      // Registrar nuevo usuario
      async function register(name, email, password) {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
          });

          const data = await response.json();

          if (response.ok) {
            // Mostrar mensaje de éxito
            registerSuccess.textContent = '¡Cuenta creada exitosamente!';
            registerSuccess.style.display = 'block';

            // Actualizar interfaz después de un breve retraso
            setTimeout(() => {
              closeModals();
              checkAuthStatus();
            }, 1500);

            return true;
          } else {
            // Mostrar mensaje de error
            if (data.error === 'email_exists') {
              registerError.textContent = 'Ya existe un usuario con este correo electrónico';
            } else {
              registerError.textContent = data.error || 'Error al crear la cuenta';
            }
            registerError.style.display = 'block';
            return false;
          }
        } catch (error) {
          console.error('Error during registration:', error);
          registerError.textContent = 'Error de conexión. Inténtalo de nuevo.';
          registerError.style.display = 'block';
          return false;
        }
      }

      // Cerrar sesión
      async function logout() {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
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

      // Event Listeners
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
      });

      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (validateRegisterForm(name, email, password, confirmPassword)) {
          register(name, email, password);
        }
      });

      showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModals();
        showRegisterModal();
      });

      showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModals();
        showLoginModal();
      });

      closeLogin.addEventListener('click', closeModals);
      closeRegister.addEventListener('click', closeModals);

      // Cerrar modal al hacer clic fuera del contenido
      window.addEventListener('click', function(e) {
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
          // Verificar si el usuario está autenticado
          try {
            const response = await fetch('/api/auth/me', { credentials: 'include' });
            const data = await response.json();
            if (!data.user) {
              alert('Por favor, inicia sesión para ver tu carrito.');
              showLoginModal();
              return;
            }
          } catch (error) {
            alert('Por favor, inicia sesión para ver tu carrito.');
            showLoginModal();
            return;
          }
          // Redirigir a la sección del carrito en miperfil.html
          window.location.href = 'miperfil.html#carrito';
        });
      }

      // Funcionalidad del carrito en el footer
      const cartIconFooter = document.getElementById('cart-icon-footer');
      if (cartIconFooter) {
        cartIconFooter.addEventListener('click', async function() {
          // Verificar si el usuario está autenticado
          try {
            const response = await fetch('/api/auth/me', { credentials: 'include' });
            const data = await response.json();
            if (!data.user) {
              alert('Por favor, inicia sesión para ver tu carrito.');
              showLoginModal();
              return;
            }
          } catch (error) {
            alert('Por favor, inicia sesión para ver tu carrito.');
            showLoginModal();
            return;
          }
          // Redirigir a la sección del carrito en miperfil.html
          window.location.href = 'miperfil.html#carrito';
        });
      }
    });
    
