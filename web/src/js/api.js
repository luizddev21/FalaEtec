const API_URL = "http://localhost:3000";


// =========================
// LOGIN
// =========================

async function login(rm, password, type) {

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rm,
                password,
                type
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Erro ao realizar login"
        );
    }

    return data;
}


// =========================
// CHECK AUTH
// =========================

async function checkAuth() {

    try {

        const response = await fetch(
            `${API_URL}/auth/check-auth`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        return response.ok;

    } catch (error) {

        console.error(
            "Erro ao verificar autenticação:",
            error
        );

        return false;
    }
}


// =========================
// REFRESH
// =========================

async function refresh() {

    try {

        const response = await fetch(
            `${API_URL}/auth/refresh`,
            {
                method: "POST",
                credentials: "include"
            }
        );

        return response.ok;

    } catch (error) {

        console.error(
            "Erro ao renovar sessão:",
            error
        );

        return false;
    }
}


// =========================
// API FETCH
// =========================

async function apiFetch(endpoint, options = {}) {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            credentials: "include"
        }
    );


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
    return fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            credentials: "include"
        }
    );
}


export default {
    login,
    checkAuth,
    refresh,
    apiFetch
};
