const API_URL = "http://localhost:3000";
let refreshPromise = null;

// =========================
// LOGIN
// =========================

async function login(rm, password, type) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rm,
      password,
      type,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao realizar login.");
  }

  return data;
}

// =========================
// LOGOUT
// =========================

async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data || "Erro ao tentar fazer logout.");
  }
}

// =========================
// CHECK AUTH
// =========================

async function checkAuth() {
  const response = await fetch(`${API_URL}/auth/check-auth`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error || "Erro ao verificar autenticação.");
    return false;
  }

  return true;
}

// =========================
// CHECK ADMIN
// =========================

async function checkAdmin() {
  const response = await fetch(`${API_URL}/auth/check-admin`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error || "Erro ao verificar o cargo.");
    return false;
  }

  return true;
}

// =========================
// REFRESH
// =========================



async function refresh() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao renovar token:", error);

      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// =========================
// API FETCH
// =========================

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  // Access token ainda é válido
  if (response.status !== 401) {
    return response;
  }

  // Access token expirou.
  // Tentamos utilizar o refresh token.
  const refreshed = await refresh();

  // Não foi possível renovar a sessão
  if (!refreshed) {
    return response;
  }

  // Access token foi renovado.
  // Repetimos a requisição original.
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });
}

// =========================
// INTERACTION
// =========================

async function createInteraction(formData) {
  const response = await fetch(
    "http://localhost:3000/interaction/create",
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar interação.");
  }

  return data;
}

async function getAllInteraction(type) {
  const response = await apiFetch("/interaction/get-all", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.error || "Erro ao tentar pegar interações");
  }

  return data;
}

export default {
  login,
  logout,
  checkAuth,
  checkAdmin,
  refresh,
  apiFetch,
  createInteraction,
  getAllInteraction,
  API_URL
}