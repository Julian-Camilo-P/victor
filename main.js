document.addEventListener('DOMContentLoaded', function() {
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

  async function checkAuthStatus() {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user && authNav) {
          renderUserMenu(data.user);
          return;
        }
      }
    } catch (e) {
      console.error('Error fetching auth status', e);
    }
    if (authNav) {
      renderLoginLink();
    }
  }

  function renderUserMenu(user) {
    if (!authNav) return;
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
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
      logoutLink.addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
      });
    }
  }

  function renderLoginLink() {
    if (!authNav) return;
    authNav.innerHTML = `<li><a href="#" id="loginLink">Iniciar Sesión</a></li>`;
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.addEventListener('click', showLoginModal);
    }
  }

  function showLoginModal() {
    if (loginModal) loginModal.style.display = 'flex';
  }

  function showRegisterModal() {
    if (registerModal) registerModal.style.display = 'flex';
  }

  function closeModals() {
    if (loginModal) loginModal.style.display = 'none';
    if (registerModal) registerModal.style.display = 'none';
    if (loginError) loginError.style.display = 'none';
    if (loginSuccess) loginSuccess.style.display = 'none';
    if (registerError) registerError.style.display = 'none';
    if (registerSuccess) registerSuccess.style.display = 'none';
  }

  async function login(email, password) {
    if (loginError) loginError.style.display = 'none';
    if (loginSuccess) loginSuccess.style.display = 'none';
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (loginSuccess) {
          loginSuccess.textContent = '¡Inicio de sesión exitoso!';
          loginSuccess.style.display = 'block';
        }
        setTimeout(() => {
          closeModals();
          checkAuthStatus();
        }, 1500);
        return true;
      } else {
        if (loginError) {
          loginError.textContent = data.message || 'Correo electrónico o contraseña incorrectos';
          loginError.style.display = 'block';
        }
        return false;
      }
    } catch (e) {
      if (loginError) {
        loginError.textContent = 'Error de conexión al servidor';
        loginError.style.display = 'block';
      }
      return false;
    }
  }

  async function register(name, email, password, confirmPassword) {
    if (!registerError || !registerSuccess) return false;
    registerError.style.display = 'none';
    registerSuccess.style.display = 'none';

    if (!validateRegisterForm(name, email, password, confirmPassword)) return false;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        registerSuccess.textContent = '¡Cuenta creada exitosamente!';
        registerSuccess.style.display = 'block';
        setTimeout(() => {
          closeModals();
          checkAuthStatus();
        }, 1500);
        return true;
      } else {
        registerError.textContent = data.message || 'El correo electrónico ya está registrado';
        registerError.style.display = 'block';
        return false;
      }
    } catch (e) {
      registerError.textContent = 'Error de conexión al servidor';
      registerError.style.display = 'block';
      return false;
    }
  }

  async function logout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        checkAuthStatus();
      } else {
        alert('Error al cerrar sesión');
      }
    } catch (e) {
      alert('Error de conexión al servidor');
    }
  }

  function validateRegisterForm(name, email, password, confirmPassword) {
    if (!registerError) return false;
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

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : '';
      const password = document.getElementById('loginPassword') ? document.getElementById('loginPassword').value : '';
      login(email, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('registerName') ? document.getElementById('registerName').value : '';
      const email = document.getElementById('registerEmail') ? document.getElementById('registerEmail').value : '';
      const password = document.getElementById('registerPassword') ? document.getElementById('registerPassword').value : '';
      const confirmPassword = document.getElementById('registerConfirmPassword') ? document.getElementById('registerConfirmPassword').value : '';
      if (validateRegisterForm(name, email, password, confirmPassword)) {
        register(name, email, password, confirmPassword);
      }
    });
  }

  if (showRegister) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      closeModals();
      showRegisterModal();
    });
  }

  if (showLogin) {
    showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      closeModals();
      showLoginModal();
    });
  }

  if (closeLogin) {
    closeLogin.addEventListener('click', closeModals);
  }

  if (closeRegister) {
    closeRegister.addEventListener('click', closeModals);
  }

  window.addEventListener('click', function(e) {
    if (e.target === loginModal) closeModals();
    if (e.target === registerModal) closeModals();
  });

  function setupCartIconClick(id) {
    const elem = document.getElementById(id);
    if (!elem) return;
    elem.addEventListener('click', function() {
      alert('Por favor, inicia sesión para ver tu carrito.');
      checkAuthStatus().then(() => {
        window.location.href = 'miperfil.html#carrito';
      });
    });
  }

  setupCartIconClick('cart-icon');
  setupCartIconClick('cart-icon-footer');

  checkAuthStatus();
});
