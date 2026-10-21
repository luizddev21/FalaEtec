// Cliente HTTP central do frontend. Mantém a origem da API, inclui cookies nas
// chamadas autenticadas e concentra funções usadas pelas telas.
const API_URL = "http://localhost:3000";
// Evita que várias requisições simultâneas tentem renovar a mesma sessão ao mesmo tempo.
let refreshPromise = null;

// =========================
// LOGIN
// =========================

async function login(rm, password, type) {
  // Envia as credenciais escolhidas na tela de login e propaga erros do servidor.
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
  // Solicita revogação da sessão; o backend apaga os cookies no navegador.
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
  // Retorna true somente quando o backend aceita o cookie de acesso atual.
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
// GET ALL USERS
// =========================

async function getAllUsers() {
  // Recupera a lista administrativa usando apiFetch para renovar a sessão se preciso.
  const response = await apiFetch("/user/all-profile");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar interação.");
  }

  return data;
}

// =========================
// CHECK ADMIN
// =========================

async function checkAdmin() {
  // Consulta a permissão específica do painel, distinta da autenticação básica.
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
  // Renova a sessão uma única vez e compartilha a Promise com chamadas concorrentes.
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
  // Camada autenticada comum: tenta a chamada original, renova em 401 e repete.
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
  // Envia FormData para permitir campos e anexo opcional sem montar JSON manualmente.
  const response = await fetch("http://localhost:3000/interaction/create", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar interação.");
  }

  return data;
}

async function getAllInteraction(type, limit = 0, params) {
  // Consulta interações por categoria, limite e filtros serializados na query string.
  const response = await apiFetch(`/interaction/get-all?${params}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, limit }),
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.error || "Erro ao tentar pegar interações");
  }

  return data;
}

// =========================
// ANSWER
// =========================

async function createAnswer(message, interactionId) {
  // Encaminha texto de resposta e identificador da interação ao backend.
  const response = await fetch("http://localhost:3000/answer/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      interactionId: interactionId,
    }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar resposta.");
  }

  return data;
}

async function deleteAnswer(id) {
  // Solicita a remoção da resposta associada ao identificador informado.
  const response = await fetch("http://localhost:3000/answer/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answerId: id,
    }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar apagar.");
  }

  return data;
}

// =========================
// User
// =========================

async function deleteUser(rm, type) {
  // Pede confirmação antes de excluir uma conta e então chama a rota administrativa.
  const proceed = confirm(
    "Deseja apagar este usuário? Todas as suas informações serão perdidas.",
  );

  if (!proceed) return;

  const response = await fetch("http://localhost:3000/user/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rm: rm,
      type: type,
    }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar apagar.");
  }

  return data;
}

async function updateUser(user) {
  // Envia os campos editados de uma conta para a rota de atualização.
  const response = await fetch("http://localhost:3000/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Erro ao tentar alterar informações do usuário.",
    );
  }

  return data;
}

async function createUser(user) {
  // Envia os dados de uma nova conta para criação pelo painel.
  const response = await fetch("http://localhost:3000/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar o usuário.");
  }

  return data;
}

// =========================
// Class
// =========================

async function deleteTurma(turma_id) {
  // Pede confirmação antes da exclusão de uma turma, que pode afetar vínculos.
  const proceed = confirm(
    "Deseja apagar esta turma? Todas as suas informações serão perdidas, incluindo os usuários ligados à ela.",
  );

  if (!proceed) return;

  const response = await fetch("http://localhost:3000/turma/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      turma_id: turma_id,
    }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar apagar.");
  }

  return data;
}

async function getAllTurma() {
  // Lista turmas disponíveis para filtros e formulários administrativos.
  const response = await apiFetch(`/turma/get-all`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.error || "Erro ao tentar pegar turmas");
  }

  return data;
}

async function createTurma(turma) {
  // Envia nome da turma e curso associado para criação.
  const response = await fetch("http://localhost:3000/turma/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turma),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar a turma.");
  }

  return data;
}

async function updateTurma(turma) {
  // Envia alterações de turma e vínculo de curso.
  const response = await fetch("http://localhost:3000/turma/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turma),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Erro ao tentar alterar informações da turma.",
    );
  }

  return data;
}

// =========================
// Course
// =========================

async function deleteCurso(curso_id) {
  // Confirma e solicita a desativação do curso indicado.
  const proceed = confirm(
    "Deseja apagar esta turma? Ele ficará permanentemente desabilitado! (As turmas ligadas à ele não são apagadas).",
  );

  if (!proceed) return;

  const response = await fetch("http://localhost:3000/curso/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      curso_id: curso_id,
    }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar apagar.");
  }

  return data;
}

async function getAllCurso() {
  // Busca os cursos ativos para listas e escolhas administrativas.
  const response = await apiFetch(`/curso/get-all`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.error || "Erro ao tentar pegar cursos");
  }

  return data;
}

async function createCurso(curso) {
  // Envia o nome de um novo curso à API.
  const response = await fetch("http://localhost:3000/curso/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(curso),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao tentar criar o curso.");
  }

  return data;
}

async function updateCurso(curso) {
  // Envia o nome atualizado e o identificador do curso.
  const response = await fetch("http://localhost:3000/curso/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(curso),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Erro ao tentar alterar informações do curso.",
    );
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
  createAnswer,
  getAllInteraction,
  getAllTurma,
  deleteAnswer,
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
  deleteTurma,
  getAllCurso,
  createTurma,
  updateTurma,
  createCurso,
  updateCurso,
  deleteCurso,
  API_URL,
};
